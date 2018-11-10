import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {UserManagementDataSource, UserManagementItem} from './user-management-datasource';
import {UserService} from '../user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {EmployeeManagementComponent} from '../employee/employee-management/employee-management.component';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../common/notification.service';
import {User} from '../user';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserManagementDataSource;
  showPaging: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'username', 'email', 'phone', 'actions'];

  empList: UserManagementItem[];

  constructor(private user: UserService,
              private dialog: MatDialog,
              private _http: HttpClient,
              private notificationService: NotificationService) {
    this.user.setComponentName('User Management');
    this.getEmployeeList();
  }

  addEmployee() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(EmployeeManagementComponent, dialogConfig);
  }
  ngOnInit() {
    this.dataSource = new UserManagementDataSource(this.paginator, this.sort);
  }

  getEmployeeList() {
    this._http.get(this.user.getrestURL() + '/users').pipe(map((response => response as UserManagementItem[]))).subscribe(data => this.setEmployeeList(data),
      error => this.notificationService.showError(error));
  }

  setEmployeeList(data: UserManagementItem[]) {
    // this.dataSource.setData(data);
    this.dataSource.setData(data);
    this.notificationService.showSuccess(':: Employee List Loaded.');
    this.showPaging = true;
    this.dataSource.connect();
  }

  isShowPagingBar() {
    return false;
  }
}
