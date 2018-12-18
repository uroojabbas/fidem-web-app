import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../user.service';
import {InventoryTransferComponent} from '../inventory-management/inventory-transfer/inventory-transfer.component';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../common/notification.service';
import {PurchaseOrderComponent} from '../purchase-order-management/purchase-order/purchase-order.component';
import {InventoryTransferService} from './inventory-transfer.service';
import {InventoryTransferStatusComponent} from './inventory-transfer-status/inventory-transfer-status.component';

@Component({
  selector: 'app-inventory-transfer-management',
  templateUrl: './inventory-transfer-management.component.html',
  styleUrls: ['./inventory-transfer-management.component.css']
})
export class InventoryTransferManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public listData: MatTableDataSource<any> = new MatTableDataSource();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['toId',  'insertedtime', 'quantity', 'totalProduct', 'transferType',
    'fromRegion', 'toRegion', 'toStatusType'];
  public searchKey: string;
  DELETE_SUCCESS_MESSAGE = 'Inventory Transfer Successfully deleted';

  constructor(private user: UserService,
              private notificationService: NotificationService,
              private _http: HttpClient,
              private changeDetectorRef: ChangeDetectorRef,
              private dialog: MatDialog,
              private inventoryTransferService: InventoryTransferService) {
    this.user.setComponentName('Transfer Order Management');
  }

  ngOnInit() {
    this.initTransferOrderList();
  }

  onTransfer() {
    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(InventoryTransferComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initTransferOrderList();
    });
  }

  initTransferOrderList() {

    this._http.get(this.user.getrestURL() + '/transferOrders').subscribe(data => this.setTransferOrderList(data),
      error => this.notificationService.showError(error));
  }

  setTransferOrderList(data: any): void {


    this.listData = new MatTableDataSource(data);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;


    this.listData.filterPredicate = ( data , filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };

    this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess('Transfer Order List Loaded');
  }

  onApprove(id: number) {
    this.inventoryTransferService.displayStepper = false;
    this.inventoryTransferService.id = id;

    const transferOrder = this.listData.data.find(d => d.id === id);

    console.log('TransferOrder Id : ' + id);
    console.log('TransferOrder : ' + JSON.stringify(transferOrder));

    this.inventoryTransferService.setTransferOrderValues(transferOrder);

    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(InventoryTransferStatusComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initTransferOrderList();
    });
  }
}
