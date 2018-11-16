import {Injectable} from '@angular/core';

@Injectable()
export class Vendor {

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
