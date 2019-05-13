import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {InventoryService} from '../../inventory-management/inventory.service';
import {MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../../common/notification.service';
import {UserService} from '../../user.service';
import {InventoryComponent} from '../../inventory-management/inventory/inventory.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['poId', 'vendorName', 'insertedtime', 'totalProducts', 'totalQuantity',
    'totalAmount', 'poStatusType', 'action'];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedProdColumns = ['productName', 'isbn', 'subject', 'quantity', 'totalLtdQuantity', 'addQuantity',
    'remainingQuantity'];

  DELETE_SUCCESS_MESSAGE = 'Product Successfully deleted';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public productList: any = [];
  public productListDatasource = new MatTableDataSource<any> (this.productList);

  public listData: any = [];
  public listDataSource = new MatTableDataSource<any> (this.listData);

  public searchKey: string;

  constructor(public inventoryService: InventoryService,
              private inventoryDialog: MatDialogRef<InventoryComponent>,
              private notificationService: NotificationService,
              private changeDetectorRef: ChangeDetectorRef,
              private user: UserService) { }

  ngOnInit() {
  }

  setPOList(data) {
    this.listData = data;
    this.listDataSource = new MatTableDataSource(this.listData);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;
    this.listData.filterPredicate = ( data , filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };

    this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess('Purchase Order List Loaded');
  }

  closeForm() {
    this.inventoryDialog.close();
  }

  showPOList() {
    this.inventoryService.getInventoryList().subscribe(data => {
        this.setPOList(data);
        this.notificationService.showSuccess('Purchase Order Successfully Added'); } ,
      error => this.notificationService.showError(error)
    );
  }

  showProducts(poId: number) {
    const po = this.listDataSource.data.find(d => d.id === poId);

    po.podetail.forEach((d, index) => {
      this.productList.push(d);
    });
    this.productListDatasource = new MatTableDataSource(this.productList);
  }

  public remainingQuantity(quantity: number, ltdQuantity: number, addQuantity: number): number {
    const qty = (quantity !== undefined ? quantity : 0);
    const ltdQty = (ltdQuantity !== undefined) ? ltdQuantity : 0;
    const addQty = (addQuantity !== undefined) ? addQuantity : 0;

    return Number(qty || 0) - (Number(ltdQty || 0) + Number(addQty || 0));
  }

  public saveInventory() {
    this.changeDetectorRef.detectChanges();
    console.log('inventoryList : ' + JSON.stringify(this.productListDatasource.data));
    this.inventoryService.save(this.productListDatasource.data);
  }

}
