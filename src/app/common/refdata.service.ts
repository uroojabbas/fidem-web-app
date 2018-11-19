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
    this.initInstitutionTypeList();
    this.initClientTypeList();
    this.initCityList();
    this.initRegionList();

  }

  private cityList: any[];
  private regionList: any[];
  private vendorTypeList: any[];
  private clientTypeList: any[];
  private institutionTypeList: any[];

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
    this.regionList = data;
  }


  initCityList(): void  {
    this._http.get(this.userSevice.getrestURL() + '/citylist').subscribe(data => this.setCityList(data));
    }

    initRegionList(): void {
       this._http.get(this.userSevice.getrestURL() + '/reigonlist').subscribe(data => this.setRegionList(data));
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
    const body = res;
    console.log('Response ', res);
    return body || { };
  }

  initClientTypeList(): void {
    this._http.get(this.userSevice.getrestURL() + '/clienttypelist').subscribe(data => this.setClientTypeList(data));
  }

  setClientTypeList(data: any): void {
    this.clientTypeList = data;
  }

  getClientTypeList(): any[] {
    return this.clientTypeList;
  }


  initInstitutionTypeList(): void {
    this._http.get(this.userSevice.getrestURL() + '/institutetypelist').subscribe(data => this.setInstitutionTypeList(data));
  }

  setInstitutionTypeList(data: any): void {
    this.institutionTypeList = data;
  }

  getInstitutionTypeList(): any[] {
    return this.institutionTypeList;
  }
}
