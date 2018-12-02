import { Injectable } from '@angular/core';
import {CommonService} from '../common/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  public _vendorList: any[];
  public editable: boolean;
  public disabled: boolean;
  public isLinear = true;
  public inventoryForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    vendorId: new FormControl(null, Validators.required),
    productId: new FormControl(null),
    userid: new FormControl(this.userService.getUserId(), Validators.required),
    poId: new FormControl('')
  });
  constructor(public commonService: CommonService,
  public userService: UserService) {
    this.editable = true;
    this.disabled = false;

    this.commonService.initVendorList().subscribe(data => this.initVendorList(data));
  }

  initVendorList(vendorList: any): void {
    this._vendorList = vendorList;
  }

  addInventory() { }


}
