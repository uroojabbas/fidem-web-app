import { Injectable } from '@angular/core';
import {CommonService} from '../common/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {PurchaseOrderItem} from './purchase-order/purchase-order-datasource';
import {User} from '../user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DialogService} from '../common/dialog.service';
import {NotificationService} from '../common/notification.service';

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
  private poDetails: any[];
  public poNumber: string;
  public editable: boolean;
  public disabled: boolean;
  constructor(private commnonService: CommonService,
              private userService: UserService,
              private _http: HttpClient,
              private dialogService: DialogService,
              private notificationService: NotificationService) {
    this.commnonService.initVendorList().subscribe(data => this.initVendorList(data));
    this.editable = true;
    this.disabled = false;
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
    this.vendorName = vendor.name === undefined ? '' : vendor.name;
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
    userid: new FormControl(this.userService.getUserId(), Validators.required),
     poId: new FormControl('')
  });


  initializeProductForm() {
    this.purchaseOrderForm.setValue(
      {
        id: null,
        vendorId: null,
        productId: null,
        userid: this.userService.getUserId(),
        poId: ''
      });
  }

  populateForm(purchaseOrder) {
    this.purchaseOrderForm.setValue({
      id: purchaseOrder.id,
      vendorId: purchaseOrder.vendor.id,
      productId: null,
      userid: this.userService.getUserId(),
      poId: purchaseOrder.poId

    });
  }


  save(dataList): void {
    this.setPoDetails(dataList);
    const po = {
      id: null,
      users: {id: this.userService.getUserId()},
      vendor: {id: this.purchaseOrderForm.get('vendorId').value},
      postatus: {postatusType: {id: 1}},
      modifiedbyuserid: null,
      modifiedtime: null,
      insertedtime: new Date(),
      isdeleted: false,
      podetail: this.poDetails
    };
    this._http.post<User>(this.userService.getrestURL() + '/purchaseorder/save', po).subscribe(data => {
        this.notificationService.showSuccess(':: Product Successfully Added.');
        this.editable = false;
        this.disabled = true;
        this.populateForm(data);
        console.log('PoId' + this.purchaseOrderForm.get('poId').value);
        this.poNumber = this.purchaseOrderForm.get('poId').value; },
      error => this.notificationService.showError(error));
  }

  private setPoDetails(dataList): void {
    this.poDetails = [ ];
    dataList.forEach((d, index) => {
       const product  = this._vendorProductList.find(vp => vp.name === d.name);
      const poDetail =     {id: null,
        poid: null,
        product: {id: product.id},
        quantity: d.quantity};
      this.poDetails.push(poDetail);
    });
    }

}
