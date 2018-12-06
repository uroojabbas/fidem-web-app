import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogService} from '../common/dialog.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {NotificationService} from '../common/notification.service';
import {InventoryComponent} from './inventory/inventory.component';

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
  public displayedColumns = ['poId', 'vendorName', 'insertedtime', 'totalProducts', 'totalQuantity',
    'totalAmount', 'userName', 'poStatusType'];
  public searchKey: string;

  constructor(private user: UserService,
              private notificationService: NotificationService,
              private _http: HttpClient,
              private dialogService: DialogService,
              private changeDetectorRef: ChangeDetectorRef,
              private dialog: MatDialog) {
    this.user.setComponentName('Inventory Management');
  }

  ngOnInit() {
    this.initInventoryList();
  }

  initInventoryList() {
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(InventoryComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initInventoryList();
    });
  }
}
