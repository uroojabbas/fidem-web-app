import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { VendorManagementDataSource } from './vendor-management-datasource';
import {UserService} from '../user.service';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css'],
})
export class VendorManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: VendorManagementDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private user: UserService) {
    this.user.setComponentName('Vendor Management');
  }

  ngOnInit() {
    this.dataSource = new VendorManagementDataSource(this.paginator, this.sort);
  }
}
