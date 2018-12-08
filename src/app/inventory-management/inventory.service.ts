import { Injectable } from '@angular/core';
import {CommonService} from '../common/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../common/notification.service';
import {Observable} from 'rxjs';
import {User} from '../user';


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
  public userService: UserService,
              private _http: HttpClient,
              private notificationService: NotificationService) {
    this.editable = true;
    this.disabled = false;

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

  public save(inventory) {
    this._http.post<User>(this.userService.getrestURL() + '/inventory/add', inventory).subscribe(data => {
        this.notificationService.showSuccess('Inventory Successfully Added');
        this.editable = false;
        this.disabled = true;},
      error => this.notificationService.showError(error));
  }
}
