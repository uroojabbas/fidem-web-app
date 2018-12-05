import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  displayedColumns: string[] = [ 'name', 'username', 'phone', 'departmentname', 'designationname', 'actions'];
  DELETE_SUCCESS_MESSAGE = 'User Successfully deleted';

  constructor(private user: UserService,
              private dialog: MatDialog,
              private _http: HttpClient,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private employeeService: EmployeeserviceService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.user.setComponentName('User Management');
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    this.employeeService.initializeEmployeeForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(EmployeeManagementComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.getEmployeeList();
    });
  }

  onEdit(id: number) {

    this.user.getUserById(id).subscribe(data => {
      this.employeeService.populateForm(JSON.parse(JSON.stringify(data))); } ,
      error => this.notificationService.showError(error))

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(EmployeeManagementComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.getEmployeeList();
    });
  }

  ngOnInit() {

    this.init();
  }

  init() {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this._http.get(this.user.getrestURL() + '/users').subscribe(data => this.setEmployeeList(data),
      error => this.notificationService.showError(error));
  }
  setEmployeeList(data: any) {

    this.listData = new MatTableDataSource(data);

    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
      });
    };
    console.log("User list" + this.listData);
    this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess('User List Loaded');
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
    this.dialogService.openConfirmDialog('Are you sure you want to delete this record?')
      .afterClosed().subscribe(res => {
      this.remove(res, id);
      });
  }

  remove(isDelete: boolean, id: number) {
      if( isDelete ) {
        this.user.deleteUser(id).subscribe(data => { this.notificationService.showSuccess(this.DELETE_SUCCESS_MESSAGE);
            this.getEmployeeList(); },
          error => this.notificationService.showError(error));
      }
  }
}
