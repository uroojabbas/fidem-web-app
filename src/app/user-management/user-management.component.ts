import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserManagementDataSource } from './user-management-datasource';
import {UserService} from '../user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {EmployeeManagementComponent} from '../employee/employee-management/employee-management.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserManagementDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'username', 'email', 'phone'];

  constructor(private user: UserService,
              private dialog: MatDialog) {
    this.user.setComponentName('User Management');
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
}
