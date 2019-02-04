import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogService} from '../common/dialog.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {NotificationService} from '../common/notification.service';
import {InventoryComponent} from './inventory/inventory.component';
import {CommonService} from '../common/common.service';
import {InventoryTransferComponent} from './inventory-transfer/inventory-transfer.component';
import {InventoryService} from './inventory.service';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public listData: MatTableDataSource<any> = new MatTableDataSource();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['name', 'subject', 'isbn', 'quantity', 'region', 'inventoryType'];
  public searchKey: string;

  constructor(private user: UserService,
              private notificationService: NotificationService,
              private _http: HttpClient,
              private dialogService: DialogService,
              private changeDetectorRef: ChangeDetectorRef,
              private dialog: MatDialog,
              private commonService: CommonService,
              private inventoryService: InventoryService) {
    this.user.setComponentName('Inventory Management');
  }

  ngOnInit() {
    this.initInventoryList();
  }

  initInventoryList() {

    this.commonService.initProductList().subscribe(data => this.setInventoryList(data),
      error => this.notificationService.showError(error));
  }

  setInventoryList(data: any): void {


    this.listData = new MatTableDataSource(data);

    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };

    this.notificationService.showSuccess('Inventory List Loaded');
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter()  {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    this.inventoryService.disabled = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(InventoryComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initInventoryList();
    });
  }

  onTransfer() {
    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    this.inventoryService.disabled = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(InventoryTransferComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initInventoryList();
    });
  }
}
