import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog} from '@angular/material';
import {UserService} from '../user.service';
import {NotificationService} from '../common/notification.service';
import {HttpClient} from '@angular/common/http';
import {DialogService} from '../common/dialog.service';
import {PurchaseOrderComponent} from './purchase-order/purchase-order.component';

@Component({
  selector: 'app-purchase-order-management',
  templateUrl: './purchase-order-management.component.html',
  styleUrls: ['./purchase-order-management.component.css']
})
export class PurchaseOrderManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public listData: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['vendorName', 'purchaseOrderNo', 'purchaseOrderDate', 'actions'];
  public searchKey: string;
  DELETE_SUCCESS_MESSAGE = 'Purchase Order Successfully deleted';

  constructor(private user: UserService,
              private notificationService: NotificationService,
              private _http: HttpClient,
              private dialogService: DialogService,
              private dialog: MatDialog) {

    this.user.setComponentName('Purchase Order Management');
  }

  ngOnInit() {
    this.initPurchaseOrderList();
  }


  initPurchaseOrderList() {

    // this._http.get(this.user.getrestURL() + '/products').subscribe(data => this.setPurhaseOrderList(data),
    //  error => this.notificationService.showError(error));
    const data = [{
      vendorName: 'Test Vendor 1',
      purchaseOrderNo: 'Po-1234',
      purchaseOrderDate: '25-Nov-2018'
    },
      {
        vendorName: 'Test Vendor 2',
        purchaseOrderNo: 'Po-12344',
        purchaseOrderDate: '25-Nov-2018'
      }];
    this.setPurhaseOrderList(data);
  }

  setPurhaseOrderList(data: any): void {

    this.listData = new MatTableDataSource(data);

    console.log('PO list: ' + this.listData.data);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    //this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(PurchaseOrderComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      // this.initProductList();
    });
  }
}
