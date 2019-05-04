import { Injectable, ElementRef } from '@angular/core';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserRoleServiceService {
  cells: {el: ElementRef, data: any}[] = [];
  public userRoleForm: FormGroup = new FormGroup({
    roleName: new FormControl('', Validators.required)
  });
  constructor(public userService: UserService,
              private _http: HttpClient) { }


  getModulePermissionList(): Observable<any> {
    return this._http.get(this.userService.getrestURL() + '/modulePermissions');
  }

  initializePersonalInfoForm() {
    this.userRoleForm.setValue(
      {
        roleName: ''
      }
    );
  }

  saveUserRole(userRoleObject: any): Observable<any> {
    if (this.userRoleForm.valid) {
      return this._http.post<User>(this.userService.getrestURL() + '/userRole/save', userRoleObject);
    }
  }
}
