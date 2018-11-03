import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserManagementDataSource } from './user-management-datasource';
import {UserService} from '../user.service';

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

  constructor(private user: UserService) {
    this.user.setComponentName('User Management');
  }

  ngOnInit() {
    this.dataSource = new UserManagementDataSource(this.paginator, this.sort);
  }
}
