import { Injectable } from '@angular/core';
import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {RefdataService} from '../common/refdata.service';
import {User} from '../user';
import {Observable} from 'rxjs';
import {NotificationService} from '../common/notification.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  public vendorTypeList: any[];

  constructor(private _http: HttpClient, private userService: UserService,
              private refDataService: RefdataService,
              private notificationService: NotificationService) {
    this.vendorTypeList = refDataService.getVendorTypeList();
  }

  public vendorForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    contactperson: new FormControl('', Validators.required),
    contactone: new FormControl(null, [Validators.minLength(11), Validators.required]),
    contactpersontwo: new FormControl(''),
    contacttwo: new FormControl(null, Validators.minLength(11)),
    ntn: new FormControl('', Validators.required),
    strn: new FormControl('', Validators.required),
    address: new FormControl(null, Validators.required),
    discount: new FormControl(0),
    paymentterms: new FormControl(0, Validators.required),
    type: new FormControl(1, Validators.required)
  });

  initializeVendorForm() {
    this.vendorForm.setValue(
      {
        id: null,
        name: '',
        email: '',
        contactperson: '',
        contactone: '',
        contactpersontwo: '',
        contacttwo: '',
        ntn: '',
        strn: '',
        address: '',
        discount: null,
        paymentterms: null,
        type: 1

      }
    );
  }

  populateForm(vendor) {
    this.vendorForm.setValue({
      id: vendor.id,
      name: vendor.name,
      email: vendor.email,
      contactperson: vendor.contactperson,
      contactone: vendor.contactone,
      contactpersontwo: vendor.contactpersontwo,
      contacttwo: vendor.contacttwo,
      ntn: vendor.ntn,
      strn: vendor.strn,
      address: vendor.address,
      discount: vendor.discount,
      paymentterms: vendor.paymentterms,
      type: vendor.type

    });
  }


  saveVendor(): Observable<any> {
    if (this.vendorForm.valid) {
      console.log(this.vendorForm.value);
      return this._http.post<User>(this.userService.getrestURL() + '/vendor/save', this.vendorForm.value);
    }
  }

    save(): void {
      this.saveVendor().subscribe(data => this.notificationService.showSuccess(':: Vendor Successfully Added.'),
        error => this.notificationService.showError(error));
    }

  clearForm() {
    this.vendorForm.reset();
    this.initializeVendorForm();
  }

  public remove(id: number): Observable<any>  {
    return this._http.post<User>(this.userService.getrestURL() + '/vendor/delete', id);
  }

  editForm(id: number): void {
    this.getVendorById(id).subscribe(data => {
        this.populateForm(JSON.parse(JSON.stringify(data))); } ,
      error => this.notificationService.showError(error));
  }

  getVendorById(id: number): Observable<any>  {
    return this._http.get(this.userService.getrestURL() + '/vendor/' + id).pipe(map(this.refDataService.extractData));
  }

}
