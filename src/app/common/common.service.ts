import { Injectable } from '@angular/core';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _vendorList: any[];
  private _productList: any[];

  getVendorList(): any[] {
    return this._vendorList;
  }

  setVendorList(data: any): void {
    this._vendorList = data;
  }

  initVendorList(): Observable<any>  {
    return this._http.get(this.userSevice.getrestURL() + '/vendors');
  }


  getProductList(): any[] {
    return this._productList;
  }

  setProductList(data: any): void {
    this._productList = data;
  }

  initProductList(): Observable<any>  {
    return this._http.get(this.userSevice.getrestURL() + '/products');
  }

  constructor(private _http: HttpClient, private userSevice: UserService) { }

  getProductListByVendor(vendorId: number): Observable<any>  {
    return this._http.get(this.userSevice.getrestURL() + '/product/vendor/' + vendorId);
  }
}
