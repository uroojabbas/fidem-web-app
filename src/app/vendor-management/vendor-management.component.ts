import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../common/notification.service';
import {DialogService} from '../common/dialog.service';
import {Vendor} from './vendor';
import {VendorService} from './vendor.service';
import {VendorComponent} from './vendor/vendor.component';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css'],
})
export class VendorManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listData: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'address', 'contactperson', 'type', 'actions'];
  public searchKey: string;
  DELETE_SUCCESS_MESSAGE = 'Vendor Successfully deleted';
  constructor(private user: UserService,
              private dialog: MatDialog,
              private _http: HttpClient,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private changeDetectorRef: ChangeDetectorRef,
              private vendor: Vendor,
              private vendorService: VendorService) {
    this.user.setComponentName('Vendor Management');
  }

  ngOnInit() {
    this.getVendorList();
  }

  getVendorList() {

    this._http.get(this.user.getrestURL() + '/vendors').subscribe(data => this.setVendorList(data),
      error => this.notificationService.showError(error));
  }

  setVendorList(data: any): void {

    this.listData = new MatTableDataSource(data);

    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = ( data , filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };
    this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess(':: Vendor List Loaded.');


  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    this.vendorService.initializeVendorForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(VendorComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.getVendorList();
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter()  {
    this.listData.filter = this.searchKey.trim().toLowerCase();
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
      this.vendorService.remove(id).subscribe(data => { this.notificationService.showSuccess(this.DELETE_SUCCESS_MESSAGE);
          this.getVendorList(); },
        error => this.notificationService.showError(error));
    }
  }

  onEdit(id: number): void {

   this.vendorService.editForm(id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(VendorComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.getVendorList();
    });
  }
}
