import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogService} from '../common/dialog.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {NotificationService} from '../common/notification.service';
import {CommonService} from '../common/common.service';
import { AddRoleComponent } from '../user-role/add-role/add-role.component';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public listData: MatTableDataSource<any> = new MatTableDataSource();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['roleId', 'roleName','actions'];
  public searchKey: string;
  
  constructor(private user: UserService,
    private notificationService: NotificationService,
    private _http: HttpClient,
    private dialogService: DialogService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private commonService: CommonService) {
this.user.setComponentName('User Role Management');
this.initUserRoleList();
}

  ngOnInit() {
    
  }

  initUserRoleList() {
    const data = [{roleId:1,
    roleName:'Admin'},
  {roleId:2,
  roleName:'Manager'}];

  this.setUserRoleList(data);
    // this.commonService.initProductList().subscribe(data => this.setInventoryList(data),
    //  error => this.notificationService.showError(error));
  }

  setUserRoleList(data): void {

    this.listData = new MatTableDataSource(data);

    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };

    this.notificationService.showSuccess('User Role List Loaded');
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter()  {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  
  openAddRoleDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(AddRoleComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      // this.getEmployeeList();
    });

  }
}
