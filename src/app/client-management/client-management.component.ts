import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from './client.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../common/notification.service';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public listData: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['name', 'address', 'principlename', 'institutetypename', 'clienttypename', 'actions'];
  public searchKey: string;
  DELETE_SUCCESS_MESSAGE = 'Client Successfully deleted';

  constructor(private clientService: ClientService,private user: UserService,
              private dialog: MatDialog,
              private _http: HttpClient,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.user.setComponentName('Client Management');
    this.initClientList();
  }


  initClientList() {

    this._http.get(this.user.getrestURL() + '/clients').subscribe(data => this.setClientList(data),
      error => this.notificationService.showError(error));
  }

  setClientList(data: any): void {

    console.log("client list : " + data);
    this.listData = new MatTableDataSource(data);

    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = ( data , filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
      });
    };
    console.log("client list" + this.listData);

    // this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess(':: Client List Loaded.');
  }
}
