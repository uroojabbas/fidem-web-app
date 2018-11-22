import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

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
    this.initCountyList();
    this.initLanguageList();
    this.initPaperQualityList();
    this.initMarketSegmentList();
    this.initProductCategoryList();
    this.initDesignationList();
    this.initDepartmentList();
  }

  private _cityList: any[];
  private _regionList: any[];
  private _vendorTypeList: any[];
  private _clientTypeList: any[];
  private _institutionTypeList: any[];
  private _countryList: any[];
  private _languageList: any[];
  private _paperQualityList: any[];
  private _marketSegmentList: any[];
  private _productCategoryList: any[];
  private _designationList: any[];
  private _departmentList: any[];


  getDepartmentList(): any[] {
    return this._departmentList;
  }

  setDepartmentList(data: any): void {
    console.log('department list : ' + data);
    this._departmentList = data;
  }

  initDepartmentList(): void  {
    this._http.get(this.userSevice.getrestURL() + '/departmentlist').subscribe(data => this.setDepartmentList(data));
  }

  getDesignationList(): any[] {
    return this._designationList;
  }

  setDesignationList(data: any): void {
    console.log('designation list : ' + data);
    this._designationList = data;
  }

  initDesignationList(): void  {
    this._http.get(this.userSevice.getrestURL() + '/designationlist').subscribe(data => this.setDesignationList(data));
  }

  getCityList(): any[] {
    return this._cityList;
  }

  setCityList(data: any): void {
    this._cityList = data;
  }

  initCityList(): void  {
    this._http.get(this.userSevice.getrestURL() + '/citylist').subscribe(data => this.setCityList(data));
    }

  getRegionList(): any[] {
    return this._regionList;
  }
  setRegionList(data: any): void {
    this._regionList = data;
  }

  initRegionList(): void {
       this._http.get(this.userSevice.getrestURL() + '/reigonlist').subscribe(data => this.setRegionList(data));
    }

    initVendorTypeList(): void {
      this._http.get(this.userSevice.getrestURL() + '/vendortypes').subscribe(data => this.setVendorTypeList(data));
    }

    getVendorTypeList(): any[] {
      return this._vendorTypeList;
    }

  setVendorTypeList(data: any) {
    this._vendorTypeList = data;
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
    this._clientTypeList = data;
  }

  getClientTypeList(): any[] {
    return this._clientTypeList;
  }


  initInstitutionTypeList(): void {
    this._http.get(this.userSevice.getrestURL() + '/institutetypelist').subscribe(data => this.setInstitutionTypeList(data));
  }

  setInstitutionTypeList(data: any): void {
    this._institutionTypeList = data;
  }

  getInstitutionTypeList(): any[] {
    return this._institutionTypeList;
  }

  initCountyList(): void  {
    this._http.get(this.userSevice.getrestURL() + '/countrylist').subscribe(data => this.setCountryList(data));
  }

  getCountryList(): any[] {
    return this._countryList;
  }

  setCountryList(value: any) {
    this._countryList = value;
  }

  initLanguageList(): void  {
    this._http.get(this.userSevice.getrestURL() + '/languagelist').subscribe(data => this.setLanguageList(data));
  }


  getLanguageList(): any[] {
    return this._languageList;
  }

  setLanguageList(value: any) {
    this._languageList = value;
  }

  initPaperQualityList(): void  {
    this._http.get(this.userSevice.getrestURL() + '/paperqualitylist').subscribe(data => this.setPaperQualityList(data));
  }

  getPaperQualityList(): any[] {
    return this._paperQualityList;
  }

  setPaperQualityList(value: any) {
    this._paperQualityList = value;
  }

  initMarketSegmentList(): void  {
    this._http.get(this.userSevice.getrestURL() + '/marketsegmentlist').subscribe(data => this.setMarketSegmentList(data));
  }

  getMarketSegmentList(): any[] {
    return this._marketSegmentList;
  }

  setMarketSegmentList(value: any) {
    this._marketSegmentList = value;
  }


  initProductCategoryList(): void  {
    this._http.get(this.userSevice.getrestURL() + '/productcategorylist').subscribe(data => this.setProductCategoryList(data));
  }

  getProductCategoryList(): any[] {
    return this._productCategoryList;
  }

  setProductCategoryList(value: any) {
    this._productCategoryList = value;
  }
}
