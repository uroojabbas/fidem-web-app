import { Injectable, ElementRef } from '@angular/core';
import {Observable} from 'rxjs';
import {RoleManagementDataSource, RoleManagementItem} from './user-role-datasource';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
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
  constructor( private dateSource: RoleManagementDataSource,
  public userService: UserService,
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

