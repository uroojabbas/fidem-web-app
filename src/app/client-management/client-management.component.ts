import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from './client.service';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../common/notification.service';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import { ClientComponent } from './client/client.component';
import {DialogService} from '../common/dialog.service';

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
              private notificationService: NotificationService,
              private dialogService: DialogService) {
    this.user.setComponentName('Client Management');
  }

  ngOnInit() {
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
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };

    // this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess(':: Client List Loaded.');
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter()  {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    this.clientService.initializeClientForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(ClientComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initClientList();
    });
  }

  onDelete(id: number): void {
    console.log('Delete : ' + id);
    this.dialogService.openConfirmDialog('Are you sure to delete this records?')
      .afterClosed().subscribe(res => {
      this.remove(res, id);
    });
  }

  remove(isDelete: boolean, id: number): void {
    if ( isDelete ) {
      this.clientService.remove(id).subscribe(data => { this.notificationService.showSuccess(this.DELETE_SUCCESS_MESSAGE);
          this.initClientList(); },
        error => this.notificationService.showError(error));
    }
  }

  onEdit(id: number): void {

    this.clientService.editForm(id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(ClientComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initClientList();
    });
  }
}
