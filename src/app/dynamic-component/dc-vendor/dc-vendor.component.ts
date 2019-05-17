import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../common/notification.service';

export interface VendorData {

  id: number;
  vendortype: string;
  name: string;
  address: string;
  email: string;
  contactperson: string;
  contactone: string;
  contactpersontwo: string;
  contacttwo: string;
  ntn: string;
  strn: string;
  discount: number;
  paymentterms: number;
  isdeleted: boolean;

}

@Component({
  selector: 'app-dc-vendor',
  templateUrl: './dc-vendor.component.html',
  styleUrls: ['./dc-vendor.component.css']
})
export class DcVendorComponent implements OnInit {

  @Input() vendorId: number;

  public vendor: VendorData;

  public ready: boolean;
  constructor(private user: UserService,
              private _http: HttpClient,
              private notificationService: NotificationService
              ) { }

  ngOnInit() {
    this.ready = false;
    if (this.vendorId === undefined) {
      this.notificationService.showErrorMsg('Vendor Id is not defined');
    } else {
      this.getVendor();
    }
  }

  getVendor(): void {

    this._http.get(this.user.getrestURL() + '/vendor/' + this.vendorId).subscribe(data => this.setVendor(data),
      error => this.notificationService.showError(error));
  }

  setVendor(data): void {
    this.vendor = data;
    this.ready = true;
  }
}
