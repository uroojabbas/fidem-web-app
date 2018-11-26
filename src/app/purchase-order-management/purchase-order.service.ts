import { Injectable } from '@angular/core';
import {CommonService} from '../common/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {PurchaseOrderItem} from './purchase-order/purchase-order-datasource';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  public _productList: any[];
  public _vendorProductList: any[];
  public _vendorList: any[];
  public isLinear = true;
  public vendorName: string;
  public vendorAddress: string;
  public vendorEmail: string;
  public vendorContactPerson: string;
  public vendorContact: string;
  public date: Date =  new Date();
  public vendorDiscount: number;
  private id: number;

  constructor(private commnonService: CommonService,
              private userService: UserService) {
    this.commnonService.initVendorList().subscribe(data => this.initVendorList(data));
  }

  initProductList(productList: any): void {
    this._productList = productList;
  }

  initVendorList(vendorList: any): void {
    this._vendorList = vendorList;
  }

  public createPurchaseOrder() {

    const vendorId = this.purchaseOrderForm.get('vendorId').value;
    const vendor  = this._vendorList.find(v => v.id === vendorId);
    this.vendorName = vendor.name;
    this.vendorAddress = vendor.address;
    this.vendorEmail = vendor.email;
    this.vendorContactPerson = vendor.contactperson;
    this.vendorContact = vendor.contactone;
    this.vendorDiscount = vendor.discount === undefined ? 1 : vendor.discount;

    this.commnonService.getProductListByVendor(vendorId).subscribe(data => this.setVendorProductList(data));
  }

  public getPurchaseOrderItem(): any {
    const productId = this.purchaseOrderForm.get('productId').value;
    const product  = this._vendorProductList.find(vp => vp.id === productId);
    const discountedPrice =  product.productcost - (product.productcost * this.vendorDiscount) / 100;
    this.id += 1;
    return {
      id: this.id,
      isbn: product.isbn,
      name: product.name,
      quantity: 1,
      price: product.productcost,
      discount: this.vendorDiscount
    };
  }
  private setVendorProductList(data: any): void {
    this._vendorProductList = data;
  }

   public purchaseOrderForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    vendorId: new FormControl(null, Validators.required),
    productId: new FormControl(null),
    userid: new FormControl(this.userService.getUserId(), Validators.required)
  });


  initializeProductForm() {
    this.purchaseOrderForm.setValue(
      {
        id: null,
        vendorId: null,
        productId: null,
        userid: this.userService.getUserId()


      });
  }

  populateForm(purchaseOrder) {
    this.purchaseOrderForm.setValue({
      id: purchaseOrder.id,
      vendorId: purchaseOrder.vendorId,
      productId: null,
      userid: this.userService.getUserId()

    });
  }

}
