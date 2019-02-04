import {Component, OnInit, ViewChild} from '@angular/core';
import {GoodsReceivedNoteServiceService} from '../goods-received-note-service.service';
import {NotificationService} from '../../common/notification.service';
import {MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {PurchaseOrderItem} from '../../purchase-order-management/purchase-order/purchase-order-datasource';

@Component({
  selector: 'app-goods-received-note-detail',
  templateUrl: './goods-received-note-detail.component.html',
  styleUrls: ['./goods-received-note-detail.component.css']
})
export class GoodsReceivedNoteDetailComponent implements OnInit {

  grnDetaildata: PurchaseOrderItem[] = [];
  dataSource = new MatTableDataSource<PurchaseOrderItem>(this.grnDetaildata);
  @ViewChild(MatSort) sort: MatSort;
  data: any;
  isReady: boolean;
  private totalQuantity: number;

  constructor(private goodsReceivedNoteServiceService: GoodsReceivedNoteServiceService,
              private notificationService: NotificationService,
              private goodsReceivedNoteDialog: MatDialogRef<GoodsReceivedNoteDetailComponent>) {
    this.isReady = false;
  }
  ngOnInit() {
      console.log('Approve PO');
      if (this.goodsReceivedNoteServiceService.id !== undefined) {
        this.goodsReceivedNoteServiceService.initGoodsReceivedNoteDetail(
          this.goodsReceivedNoteServiceService.id).subscribe(data => this.setGoodsReceivedNoteDate(data),
          error => this.notificationService.showError(error));
      }
    }

  getGrnDate() {
    if (this.data !== undefined) {
      return this.data.insertedtime;
    }
  }

  getGrnId() {
    if (this.data !== undefined) {
      return this.data.grnId;
    }
  }

  getPoId() {
   return this.data.pomaster.poId;
  }

  getVendorName() {
    return this.data.pomaster.vendor.name;
  }

  getVendorAddress() {
    return this.data.pomaster.vendor.address;
  }

  getVendorEmail() {
    return this.data.pomaster.vendor.email;
  }

  getVendorContactPerson() {
    return this.data.pomaster.vendor.contactperson;
  }

  getVendorContact() {
    return this.data.pomaster.vendor.contactone;
  }

  setGoodsReceivedNoteDate(data) {
    this.data = data;

    const grnDetail =  this.data.grndetail;

    if (grnDetail !== undefined) {
      grnDetail.forEach((d, index) => {
        const purchaseItem = {
          id: d.product.id,
          isbn: d.product.isbn,
          name: d.product.name,
          quantity: d.quantity,
          price: d.product.productcost,
          discount: data.pomaster.vendor.discount
        };

        console.log('grn Data : ' + JSON.stringify(purchaseItem));

        this.addGrnDetailItem(purchaseItem);
      });
    }

    this.isReady = true;
  }

  public addGrnDetailItem(grnDetailItem) {
    this.grnDetaildata.push(grnDetailItem);
    this.dataSource = new MatTableDataSource<PurchaseOrderItem>(this.grnDetaildata);
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
    this.goodsReceivedNoteDialog.close();
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
}
