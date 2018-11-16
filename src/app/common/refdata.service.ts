import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefdataService {

  constructor(private _http: HttpClient, private userSevice: UserService) {
    this.initVendorTypeList();
  }

  private cityList: any[];
  private regionList: any[];
  private vendorTypeList: any[];

  getCityList(): any[] {
    return this.cityList;
  }

  setCityList(data: any): void {
    console.log(data);
    this.cityList = data;
  }

  getRegionList(): any[] {
    return this.regionList;
  }
  setRegionList(data: any): void {
    console.log(data);
    this.regionList = data;
  }


  initCityList(): Observable<any>  {
    return this._http.get(this.userSevice.getrestURL() + '/citylist');
    }

    initRegionList(): Observable<any> {
      return this._http.get(this.userSevice.getrestURL() + '/reigonlist');
    }

    initVendorTypeList(): void {
      this._http.get(this.userSevice.getrestURL() + '/vendortypes').subscribe(data => this.setVendorTypeList(data));
    }

    getVendorTypeList(): any[] {
      return this.vendorTypeList;
    }

  setVendorTypeList(data: any) {
    this.vendorTypeList = data;
  }

  public extractData(res: Response) {
    let body = res;
    console.log("Response ", res)
    return body || { };
  }
}
