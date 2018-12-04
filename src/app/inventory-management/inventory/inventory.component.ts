import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {InventoryService} from '../inventory.service';
import {MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../../common/notification.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['poId', 'vendorName', 'insertedtime', 'totalProducts', 'totalQuantity',
    'totalAmount', 'poStatusType', 'action'];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedProdColumns = ['productName', 'isbn', 'subject', 'quantity', 'remainingQuantity'];

  DELETE_SUCCESS_MESSAGE = 'Product Successfully deleted';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public listData: MatTableDataSource<any> = new MatTableDataSource();
  public productList: MatTableDataSource<any> = new MatTableDataSource();

  public searchKey: string;

  constructor(public inventoryService: InventoryService,
              private inventoryDialog: MatDialogRef<InventoryComponent>,
              private notificationService: NotificationService,
              private changeDetectorRef: ChangeDetectorRef,
              private user: UserService) { }

  ngOnInit() {
  }

  setInventoryList(data) {

    this.listData = new MatTableDataSource(data);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;
    this.listData.filterPredicate = ( data , filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };

    this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess(':: Purcahse Order List Loaded.');
  }

  closeForm() {
    this.inventoryDialog.close();
  }

  showPOList() {
    this.inventoryService.getInventoryList().subscribe(data => {
        this.setInventoryList(data);
        this.notificationService.showSuccess(':: PO Successfully Added.'); } ,
      error => this.notificationService.showError(error)
    );
  }

  showProducts(poId: number) {
    const po = this.listData.data.find(d => d.id === poId);
    console.log('Po Details : ' + po.podetail);

    this.productList = new MatTableDataSource(po.podetail);
  }
}
