import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../common/notification.service';
import {DialogService} from '../common/dialog.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {PurchaseOrderComponent} from '../purchase-order-management/purchase-order/purchase-order.component';
import {PurchaseOrderService} from '../purchase-order-management/purchase-order.service';
import {GoodsReceivedNoteDetailComponent} from './goods-received-note-detail/goods-received-note-detail.component';
import {GoodsReceivedNoteServiceService} from './goods-received-note-service.service';

@Component({
  selector: 'app-goods-received-note',
  templateUrl: './goods-received-note.component.html',
  styleUrls: ['./goods-received-note.component.css']
})
export class GoodsReceivedNoteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listData: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'purchaseOrderId', 'vendorName', 'amount', 'receivedDate', 'userName', 'actions'];
  public searchKey: string;
  DELETE_SUCCESS_MESSAGE = 'GRN Successfully deleted';

  constructor(private user: UserService,
              private dialog: MatDialog,
              private _http: HttpClient,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private changeDetectorRef: ChangeDetectorRef,
              private purchaseOrderService: PurchaseOrderService,
              private goodsReceivedNoteServiceService: GoodsReceivedNoteServiceService) {
    this.user.setComponentName('GRN Management');
  }

  ngOnInit() {
    this.getGRNList();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter()  {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  showGRNDetails(id: number) {
    this.goodsReceivedNoteServiceService.id = id;

    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(GoodsReceivedNoteDetailComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
    });
  }

  showPurchaseOrder(id: number) {
    this.purchaseOrderService.displayStepper = false;
    this.purchaseOrderService.id = id;

    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(PurchaseOrderComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      });
  }


  getGRNList() {

    this._http.get(this.user.getrestURL() + '/grn/grn-list').subscribe(data => this.setGRNList(data),
      error => this.notificationService.showError(error));
  }

  setGRNList(data: any): void {

    this.listData = new MatTableDataSource(data);

    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = ( data , filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };
    this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess('GRN List Loaded');


  }

}
