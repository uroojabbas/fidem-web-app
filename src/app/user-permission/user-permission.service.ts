import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {
  private userId: number;

  constructor(public userService: UserService,
              private _http: HttpClient) { }


  getUserRoleList(): Observable<any> {
    const url = this.userService.getrestURL() + '/userRole';
    return this._http.get(url);
  }

  public setUserId(userId: number):  void {
    this.userId = userId;
  }

  public getUserId(): number {
    return this.userId;
  }
}
