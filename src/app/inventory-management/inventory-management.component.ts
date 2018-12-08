import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogService} from '../common/dialog.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {NotificationService} from '../common/notification.service';
import {InventoryComponent} from './inventory/inventory.component';
import {CommonService} from '../common/common.service';

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
  public displayedColumns = ['name', 'subject', 'originalQuantity', 'totalLtdQuantity', 'remainingQuantity'];
  public searchKey: string;

  constructor(private user: UserService,
              private notificationService: NotificationService,
              private _http: HttpClient,
              private dialogService: DialogService,
              private changeDetectorRef: ChangeDetectorRef,
              private dialog: MatDialog,
              private commonService: CommonService) {
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
