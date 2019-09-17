import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {
  private userId: number;

  constructor(public userService: UserService,
              private _http: HttpClient) { }


  getUserRoleList(userId: number): Observable<any> {
    const url = this.userService.getrestURL() + '/userRole/' + userId;
    return this._http.get(url);
  }

  public setUserId(userId: number):  void {
    this.userId = userId;
  }

  public getUserId(): number {
    return this.userId;
  }

  addUpdateRole(userRole): Observable<any> {
    const reqURL = '/userRoles/add_update';
    return this._http.post(this.userService.getrestURL() + reqURL, userRole);
  }
}
