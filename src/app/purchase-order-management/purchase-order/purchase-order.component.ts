import {Component, OnInit, ViewChild} from '@angular/core';
import {PurchaseOrderService} from '../purchase-order.service';
import {DataSource} from '@angular/cdk/collections';
import {MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {PurchaseOrderDatasource, PurchaseOrderItem} from './purchase-order-datasource';
import {ProductComponent} from '../../product-management/product/product.component';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  data: PurchaseOrderItem[] = [];
  dataSource = new MatTableDataSource<PurchaseOrderItem>(this.data);
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['isbn', 'name',  'quantity', 'price', 'discount', 'discountedPrice', 'total', 'action'];
  DELETE_SUCCESS_MESSAGE = 'Product Successfully deleted';

  constructor(private purchaseOrderService: PurchaseOrderService,
              private purchaseOrderDialog: MatDialogRef<PurchaseOrderComponent>) { }

  ngOnInit() {
  }

  public addProduct() {
    const purchaseItem = this.purchaseOrderService.getPurchaseOrderItem();
    this.data.push(purchaseItem);
    this.dataSource = new MatTableDataSource<PurchaseOrderItem>(this.data);
    console.log('purchase Item : ' + this.dataSource.data);
  }

  public getDiscountedPrice(productCost: number, discount: number): number {
    const discountPercentage = (discount === undefined || 0) ? 1 : discount;
    const cost = (productCost === undefined) ? 0 : productCost;
    return cost - ((discountPercentage * cost) / 100);
  }

  public getTotalAmount(productCost: number, discount: number, totalPrice: number): number {
    const discountPercentage = (discount === undefined || 0) ? 1 : discount;
    const cost = (productCost === undefined) ? 0 : productCost;
    const total = (totalPrice === undefined) ? 0 : totalPrice;

    return (cost - ((discountPercentage * cost) / 100)) * total;
  }

  public closeForm() {
    this.purchaseOrderDialog.close();
  }
}
