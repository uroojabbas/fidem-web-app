import {ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {InventoryService} from '../../inventory-management/inventory.service';
import {MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../../common/notification.service';
import {UserService} from '../../user.service';
import {InventoryComponent} from '../../inventory-management/inventory/inventory.component';
import {SelectionModel} from '@angular/cdk/collections';
import {GoodsReceivedNoteDetailComponent} from '../../goods-received-note/goods-received-note-detail/goods-received-note-detail.component';
import {PurchaseOrderComponent} from '../../purchase-order-management/purchase-order/purchase-order.component';
import {PurchaseOrderService} from '../../purchase-order-management/purchase-order.service';
import {GoodsReceivedNoteServiceService} from '../../goods-received-note/goods-received-note-service.service';
import {HttpClient} from '@angular/common/http';
import {InvoiceManagementService} from '../invoice-management.service';
import {DcVendorComponent} from '../../dynamic-component/dc-vendor/dc-vendor.component';
import {DcGoodsReceivedNoteComponent} from '../../dynamic-component/dc-goods-received-note/dc-goods-received-note.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public productList: any = [];
  public productListDatasource = new MatTableDataSource<any> (this.productList);


  listData: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'purchaseOrderId', 'vendorName', 'amount', 'receivedDate', 'userName', 'actions'];
  public searchKey: string;

  selection = new SelectionModel<number>(true, []);

  vendorComponentRef: any;
  grnComponentRef: any;
  @ViewChild('childComponent', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(public inventoryService: InventoryService,
              private inventoryDialog: MatDialogRef<InventoryComponent>,
              private notificationService: NotificationService,
              private changeDetectorRef: ChangeDetectorRef,
              private purchaseOrderService: PurchaseOrderService,
              private user: UserService,
              private dialog: MatDialog,
              private _http: HttpClient,
              private goodsReceivedNoteServiceService: GoodsReceivedNoteServiceService,
              private invoiceManagementService: InvoiceManagementService,
              private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyVendorComponent();
    this.destroyGRNComponent();
  }

  destroyAllComponents() {
    this.destroyVendorComponent();
    this.destroyGRNComponent();
  }

  destroyVendorComponent() {
    this.vendorComponentRef.destroy();
  }

  destroyGRNComponent() {
    this.grnComponentRef.destroy();
  }


  closeForm() {
    alert('Selection size : ' + this.selection.selected.length);
    this.inventoryDialog.close();
  }

  showComponents() {
    this.showInvoice();
    this.showGRNList();
  }
  showInvoice() {
    const vendorId = this.invoiceManagementService.inventoryForm.get('vendorId').value;
    const factory = this.resolver.resolveComponentFactory(DcVendorComponent);
    this.vendorComponentRef = this.entry.createComponent(factory);
    (<DcVendorComponent>this.vendorComponentRef.instance).vendorId = vendorId;
    }

  showGRNList() {
    const factory = this.resolver.resolveComponentFactory(DcGoodsReceivedNoteComponent);
    this.grnComponentRef = this.entry.createComponent(factory);
    (<DcGoodsReceivedNoteComponent>this.grnComponentRef.instance).grnList = (this.selection.selected);
  }

  showGRNDetails(id: number) {
    this.goodsReceivedNoteServiceService.id = id;

    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(GoodsReceivedNoteDetailComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
    });
  }

  showPurchaseOrder(id: number) {
    this.purchaseOrderService.displayStepper = false;
    this.purchaseOrderService.id = id;

    const dialogConfig = new MatDialogConfig();
    // this.productService.initializeProductForm();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(PurchaseOrderComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
    });
  }


  getGRNList() {

    this._http.get(this.user.getrestURL() + '/grn/vendor/' +
      this.invoiceManagementService.inventoryForm.get('vendorId').value).subscribe(data => this.setGRNList(data),
      error => this.notificationService.showError(error));
  }

  setGRNList(data: any): void {

    this.listData = new MatTableDataSource(data);

    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = ( data , filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele] !== undefined && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
      });
    };
    this.changeDetectorRef.detectChanges();
    this.notificationService.showSuccess('GRN List Loaded');


  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(id?: number): string {
    return `${this.selection.isSelected(id) ? 'deselect' : 'select'} row ${id}`;
  }
}
