import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../common/notification.service';
import {RefdataService} from '../common/refdata.service';
import {CommonService} from '../common/common.service';
import {User} from '../user';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceManagementService { public _vendorList: any[];
  public editable: boolean;
  public disabled: boolean;
  public isLinear = true;
  public _regionList: any[];

  public inventoryForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    vendorId: new FormControl(null, Validators.required),
    productId: new FormControl(null),
    userid: new FormControl(this.userService.getUserId(), Validators.required),
    poId: new FormControl('')
  });

  public inventoryTransferForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    transferType: new FormControl('Region_Inventory_Transfer', Validators.required),
  });

  public inventoryTransferRegionForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    transferRegionFrom: new FormControl(null, Validators.required),
    transferRegionTo: new FormControl(null)});

  public isRegionTransfer(): boolean {
    const transferType = this.inventoryTransferForm.get('transferType').value;
    return (transferType === 'Region_Inventory_Transfer') ? true : false;
  }
  constructor(public commonService: CommonService,
              public userService: UserService,
              private _http: HttpClient,
              private notificationService: NotificationService,
              private refDataService: RefdataService) {
    this.editable = true;
    this.disabled = false;
    this._regionList = refDataService.getRegionList();
    this.commonService.initVendorList().subscribe(data => this.initVendorList(data));
  }

  initVendorList(vendorList: any): void {
    this._vendorList = vendorList;
  }

  addInventory() { }

  getInventoryList(): Observable<any> {
    const vendorId = this.inventoryForm.get('vendorId').value;
    return this._http.get(this.userService.getrestURL() + '/po/vendor/' + vendorId);
  }

  getProductList(): Observable<any> {
    const region = this.inventoryTransferRegionForm.get('transferRegionFrom').value;
    const url = this.userService.getrestURL() + '/products/region/' + region;
    console.log("rest url : " + url);
    return this._http.get(url);
  }

  public save(inventory) {
    const inventoryList = {userId: this.userService.getUserId(),
      products: inventory};
    console.log('inventory list' + inventoryList);
    this._http.post<Object>(this.userService.getrestURL() + '/inventory/add', inventoryList).subscribe(data => {
        this.notificationService.showSuccess('Inventory Successfully Added');
        this.editable = false;
        this.disabled = true; },
      error => this.notificationService.showError(error));
  }

  public saveInventoryTransfer(transferOrder) {
    this._http.post<User>(this.userService.getrestURL() + '/transferOrder/save', transferOrder).subscribe(data => {
        this.notificationService.showSuccess('Inventory Transfer Successfully Added');
        this.editable = false;
        this.disabled = true; },
      error => this.notificationService.showError(error));
  }
}
