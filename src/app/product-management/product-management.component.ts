import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../user.service';
import {DialogService} from '../common/dialog.service';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../common/notification.service';
import {ProductService} from './product.service';
import {ProductComponent} from './product/product.component';
import {CommonService} from '../common/common.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public listData: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['name', 'author', 'languagename', 'publisher', 'isbn', 'subject', 'actions'];
  public searchKey: string;
  DELETE_SUCCESS_MESSAGE = 'Product Successfully deleted';

  constructor(private user: UserService,
              private dialog: MatDialog,
              private _http: HttpClient,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private productService: ProductService,
              private commonService: CommonService) {
    this.user.setComponentName('Product Management');
  }

  ngOnInit() {
    this.initProductList();
  }

  initProductList() {

     this.commonService.initProductList().subscribe(data => this.setProuctList(data),
       error => this.notificationService.showError(error));
    }

  setProuctList(data: any): void {

    console.log("product list : " + data);
    this.listData = new MatTableDataSource(data);

    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = ( data , filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };

    // this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess('Product List Loaded');
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
    this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(ProductComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initProductList();
    });
  }

  onDelete(id: number): void {
    console.log('Delete : ' + id);
    this.dialogService.openConfirmDialog('Are you sure you want to delete this record?')
      .afterClosed().subscribe(res => {
      this.remove(res, id);
    });
  }

  remove(isDelete: boolean, id: number): void {
    if ( isDelete ) {
      this.productService.remove(id).subscribe(data => { this.notificationService.showSuccess(this.DELETE_SUCCESS_MESSAGE);
          this.initProductList(); },
        error => this.notificationService.showError(error));
    }
  }

  onEdit(id: number): void {

    this.productService.editForm(id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(ProductComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
      this.initProductList();
    });
  }
}
