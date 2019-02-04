import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {InventoryComponent} from '../inventory/inventory.component';
import {MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {InventoryService} from '../inventory.service';
import {UserService} from '../../user.service';
import {NotificationService} from '../../common/notification.service';
import {RefdataService} from '../../common/refdata.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/internal/operators';

@Component({
  selector: 'app-inventory-transfer',
  templateUrl: './inventory-transfer.component.html',
  styleUrls: ['./inventory-transfer.component.css']
})
export class InventoryTransferComponent implements OnInit {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedProdColumns = ['productName', 'isbn', 'subject', 'quantity', 'transferQuantity',
    'remainingQuantity'];

  DELETE_SUCCESS_MESSAGE = 'Product Successfully deleted';
  public productList: any = [];
  public productListDatasource = new MatTableDataSource<any> (this.productList);

  public selectedProductList: any = [];
  public selectedProductListDatasource = new MatTableDataSource<any> (this.productList);


  public productControl = new FormControl();

  filteredOptions: Observable<any[]>;

  transferTypes: any[] = [{label: 'Region Transfer',
    value: 'Region_Inventory_Transfer'}, {label: 'Sample Transfer',
    value: 'Sample_Inventory_Transfer'}];

  constructor(public inventoryService: InventoryService,
              private inventoryDialog: MatDialogRef<InventoryComponent>,
              private notificationService: NotificationService,
              private changeDetectorRef: ChangeDetectorRef,
              private user: UserService) { }

  ngOnInit() {
    this.inventoryService.disabled = false;
  }



  private _filter(value: string): string[] {
    const filterValue = (value !== undefined) ? value.toLowerCase() : '';

    return this.productListDatasource.data.filter(product =>
      product.name.toLowerCase().includes(filterValue));
  }

  closeForm() {
    this.inventoryDialog.close();
  }

  setProductList(data) {
    this.productList = data;
    this.productListDatasource = new MatTableDataSource(this.productList);

    this.filteredOptions = this.productControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

   }

  addProduct() {
    const product = this.productList.find(p => p.name.toLowerCase() === this.productControl.value.toLowerCase() );
    if (product !== null && product !== undefined) {
      this.selectedProductList.push(product);
      this.selectedProductListDatasource = new MatTableDataSource<any>(this.selectedProductList);
    }
  }

  showProductList() {
    this.inventoryService.getProductList().subscribe(data => {
        this.setProductList(data);
        this.notificationService.showSuccess('Inventory Loaded'); } ,
      error => this.notificationService.showError(error)
    );
  }

  public remainingQuantity(quantity: number, ltdQuantity: number, addQuantity: number): number {
    const qty = (quantity !== undefined ? quantity : 0);
    const ltdQty = (ltdQuantity !== undefined) ? ltdQuantity : 0;
    const addQty = (addQuantity !== undefined) ? addQuantity : 0;

    return Number(qty || 0) - (Number(ltdQty || 0) + Number(addQty || 0));
  }

  public saveTransfer() {

    const fromRegion = this.inventoryService.inventoryTransferRegionForm.get('transferRegionFrom').value;
    const toRegion = this.inventoryService.inventoryTransferRegionForm.get('transferRegionTo').value;
    const to = {
      users: {id: this.user.getUserId()},
      todetail: this.getToDetails(),
      transfertype: this.inventoryService.inventoryTransferForm.get('transferType').value,
      fromregion: fromRegion,
      toregion: ( toRegion === undefined || toRegion === null) ? fromRegion : toRegion,
      modifiedbyuserid: null,
      modifiedtime: null,
      insertedtime: new Date(),
      isdeleted: false
    };
    this.changeDetectorRef.detectChanges();
    console.log('inventory Transfer : ' + JSON.stringify(to));
    this.inventoryService.saveInventoryTransfer(to);
  }


  private getToDetails(): any {
    const toDetails = [ ];
    this.selectedProductList.forEach((d, index) => {
      const product  = d;
      const toDetail =     {id: null,
        product: {id: product.id},
        quantity: d.transferQuantity};
      if (d.transferQuantity > 0) {
        toDetails.push(toDetail);
      }
    });
    return toDetails;
  }
}
