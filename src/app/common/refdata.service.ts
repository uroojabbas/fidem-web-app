import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefdataService {

  constructor(private _http: HttpClient, private userSevice: UserService) { }

  private cityList: any[];
  private regionList: any[];

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
}
