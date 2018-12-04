import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog} from '@angular/material';
import {UserService} from '../user.service';
import {NotificationService} from '../common/notification.service';
import {HttpClient} from '@angular/common/http';
import {DialogService} from '../common/dialog.service';
import {PurchaseOrderComponent} from './purchase-order/purchase-order.component';
import {PurchaseOrderService} from './purchase-order.service';

@Component({
  selector: 'app-purchase-order-management',
  templateUrl: './purchase-order-management.component.html',
  styleUrls: ['./purchase-order-management.component.css']
})
export class PurchaseOrderManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public listData: MatTableDataSource<any> = new MatTableDataSource();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['poId', 'vendorName', 'insertedtime', 'totalProducts', 'totalQuantity',
  'totalAmount', 'userName', 'poStatusType'];
  public searchKey: string;
  DELETE_SUCCESS_MESSAGE = 'Purchase Order Successfully deleted';

  constructor(private user: UserService,
              private notificationService: NotificationService,
              private _http: HttpClient,
              private dialogService: DialogService,
              private changeDetectorRef: ChangeDetectorRef,
              private dialog: MatDialog,
              private purchaseOrderService: PurchaseOrderService) {

    this.user.setComponentName('Purchase Order Management');
  }

  ngOnInit() {
    this.initPurchaseOrderList();
  }


  initPurchaseOrderList() {

    this._http.get(this.user.getrestURL() + '/purchaseorders').subscribe(data => this.setPurhaseOrderList(data),
    error => this.notificationService.showError(error));
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter()  {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  setPurhaseOrderList(data: any): void {


    this.listData = new MatTableDataSource(data);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;


    this.listData.filterPredicate = ( data , filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };

    this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess('Purchase Order List Loaded.');
  }

  onCreate() {
    this.purchaseOrderService.displayStepper = true;
    this.purchaseOrderService.disabled = false;
    this.purchaseOrderService.initializePurchaseOrderForm();
    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(PurchaseOrderComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initPurchaseOrderList();
    });
  }

  onApprove(id: number) {
    this.purchaseOrderService.displayStepper = false;
    this.purchaseOrderService.id = id;

    const data = this.listData.data.find(d => d.id === id);
    console.log('VendorId : ' + data.vendor.id);


    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(PurchaseOrderComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initPurchaseOrderList();
    });
  }

}
