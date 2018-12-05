import {Component, OnInit, ViewChild} from '@angular/core';
import {PurchaseOrderService} from '../purchase-order.service';
import {MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {PurchaseOrderItem} from './purchase-order-datasource';
import {NotificationService} from '../../common/notification.service';

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
  private totalQuantity: number;
  constructor(private purchaseOrderService: PurchaseOrderService,
             private purchaseOrderDialog: MatDialogRef<PurchaseOrderComponent>,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    if (this.purchaseOrderService.displayStepper === false) {
      console.log('Approve PO');
      if (this.purchaseOrderService.id !== undefined) {
        this.purchaseOrderService.initPurchaseOrder(this.purchaseOrderService.id).subscribe(data => this.setPurhaseOrder(data),
          error => this.notificationService.showError(error));
      }
    }
  }

  setPurhaseOrder(data: any): void {
    const po = data;

    this.purchaseOrderService.populateForm(po);
    const poDetails =  po.podetail;
    console.log('PO Data : ' + poDetails);

    if (poDetails !== undefined) {
      poDetails.forEach((d, index) => {
        const purchaseItem = {
          id: d.product.id,
          isbn: d.product.isbn,
          name: d.product.name,
          quantity: d.quantity,
          price: d.product.productcost,
          discount: po.vendor.discount
        };

        this.addProductItem(purchaseItem);
      });
    }

    this.purchaseOrderService.setVendorInfo(po.vendor.id);

  }

  public addProduct() {
    const purchaseItem = this.purchaseOrderService.getPurchaseOrderItem();
    this.addProductItem(purchaseItem);
  }

  public addProductItem(purchaseItem) {
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

  /** Gets the total amount of all products. */
  getTotalQuantity(): number {
    this.totalQuantity = 0;
    this.dataSource.data.forEach((d, index) => {
      this.totalQuantity = Number(this.totalQuantity || 0) + Number(d.quantity || 0);
    });

    return this.totalQuantity;
  }

  getSumOfAmount(): number {
    let totalAmount = 0;
    this.dataSource.data.forEach((d, index) => {
      totalAmount = Number(totalAmount || 0) +
        (Number(d.quantity || 0) * this.getDiscountedPrice(d.price, d.discount));
    });

    return totalAmount;
  }

  getProductsCount(): number {
    return this.dataSource.data.length;
  }

  save() {
    this.purchaseOrderService.save(this.dataSource.data);
  }

  onDelete(id: number): void {
    this.data.splice(id,1 );
    this.dataSource = new MatTableDataSource<PurchaseOrderItem>(this.data);
  }

  approvePO() {
    this.purchaseOrderService.approvePO().subscribe(data => {
        this.notificationService.showSuccess('Purchase Order Approved');
        this.purchaseOrderService.populateForm(data);
        setTimeout(() => this.purchaseOrderDialog.close(),3000); } ,
      error => this.notificationService.showError(error));
  }

  rejectPO() {
    this.purchaseOrderService.rejectPO().subscribe(data => {
        this.notificationService.showSuccess('Purchase Order Rejected');
        this.purchaseOrderService.populateForm(data);
        setTimeout(() => this.purchaseOrderDialog.close(),3000); // 2500 is millisecond
      } ,
      error => this.notificationService.showError(error));
  }

  cancelPO() {
    this.purchaseOrderService.cancelPO().subscribe(data => {
        this.notificationService.showSuccess('Purchase Order Cancelled');
        this.purchaseOrderService.populateForm(data);
        setTimeout(() => this.purchaseOrderDialog.close(),3000) } ,
      error => this.notificationService.showError(error));
  }
}
