import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {InventoryTransferComponent} from '../inventory-management/inventory-transfer/inventory-transfer.component';
import {DialogService} from '../common/dialog.service';
import {HttpClient} from '@angular/common/http';
import {InventoryService} from '../inventory-management/inventory.service';
import {NotificationService} from '../common/notification.service';
import {CommonService} from '../common/common.service';
import {UserService} from '../user.service';
import {InvoiceComponent} from './invoice/invoice.component';
import {InvoiceManagementService} from './invoice-management.service';

@Component({
  selector: 'app-invoice-management',
  templateUrl: './invoice-management.component.html',
  styleUrls: ['./invoice-management.component.css']
})
export class InvoiceManagementComponent implements OnInit {
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
              private invoiceManagementService: InvoiceManagementService) {
    this.user.setComponentName('Inventory Management');
  }

  ngOnInit() {
    this.initInventoryList();
  }

  initInventoryList() {

    this.commonService.initInventoryList().subscribe(data => this.setInventoryList(data),
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
    this.invoiceManagementService.disabled = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(InvoiceComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initInventoryList();
    });
  }

  onTransfer() {
    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    this.invoiceManagementService.disabled = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(InventoryTransferComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initInventoryList();
    });
  }
}
