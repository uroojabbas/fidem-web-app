import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserManagementDataSource, UserManagementItem} from './user-management-datasource';
import {UserService} from '../user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {EmployeeManagementComponent} from '../employee/employee-management/employee-management.component';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../common/notification.service';
import {DialogService} from '../common/dialog.service';
import {EmployeeserviceService} from '../employee/employeeservice.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listData: MatTableDataSource<any>;
  showPaging: boolean = false;
  public searchKey: string;
  dataSource: UserManagementDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [ 'name', 'username', 'email', 'phone', 'actions'];
  DELETE_SUCCESS_MESSAGE = 'User Successfully deleted';

  constructor(private user: UserService,
              private dialog: MatDialog,
              private _http: HttpClient,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private employeeService: EmployeeserviceService) {
    this.user.setComponentName('User Management');
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    this.employeeService.initializeEmployeeForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(EmployeeManagementComponent, dialogConfig);
  }

  onEdit(id: number) {

    this.user.getUserById(id).subscribe(data => {
      this.employeeService.populateForm(JSON.parse(JSON.stringify(data))); } ,
      error => this.notificationService.showError(error))

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(EmployeeManagementComponent, dialogConfig);
  }

  ngOnInit() {

    this.init();
  }

  init() {
    this._http.get(this.user.getrestURL() + '/users').subscribe(data => this.setEmployeeList(data),
      error => this.notificationService.showError(error));
  }

  setEmployeeList(data: any) {
    this.dataSource = new UserManagementDataSource(this.paginator, this.sort);
    this.dataSource.setData(data);

    this.listData = new MatTableDataSource(data);

    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
      });
    };
    console.log("User list" + this.listData);
    this.notificationService.showSuccess(':: Employee List Loaded.');
    this.showPaging = true;
   }

  isShowPagingBar() {
    return false;
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter()  {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(id: number) {
    console.log('Delete : ' + id);
    this.dialogService.openConfirmDialog('Are you sure to delete this records?')
      .afterClosed().subscribe(res => this.remove(res, id));
  }

  remove(isDelete: boolean, id: number) {
      if( isDelete ) {
        this.user.deleteUser(id).subscribe(data => this.notificationService.showSuccess(this.DELETE_SUCCESS_MESSAGE),
          error => this.notificationService.showError(error));
      }
  }
}
