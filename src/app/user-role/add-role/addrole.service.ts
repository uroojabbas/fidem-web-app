import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/user';
import {RefdataService} from 'src/app/common/refdata.service';

@Injectable({
  providedIn: 'root'
})
export class AddroleService {
  cells: {el: ElementRef, data: any}[] = [];
  public userRoleForm: FormGroup = new FormGroup({
    roleName: new FormControl('', Validators.required)
  });
  constructor(public userService: UserService,
    private _http: HttpClient, private refDataService: RefdataService) { }

    initializePersonalInfoForm() {
      this.userRoleForm.setValue(
        {
          roleName: ''
        }
      );
    }
  getModulePermissionList(): Observable<any>  {
    return this._http.get(this.userService.getrestURL() + '/modulePermissions');
  }

  saveUserRole(userRoleObject: any): Observable<any> {
    if (this.userRoleForm.valid) {
      return this._http.post<User>(this.userService.getrestURL() + '/userRoles/save', userRoleObject);
    }
  }
  populateForm(userRole) {
    this.userRoleForm.setValue({
      id: userRole.Roleid,
      name: userRole.Rolename,
     });

  }
  editUserRole(userRoleObject: any): Observable<any>{
    if (this.userRoleForm.valid) {
      return this._http.post<User>(this.userService.getrestURL() + '/userRoles/edit', userRoleObject);
    }
   }
   
  deleteUserRole(id: number): Observable<any> {
    return this._http.post<User>(this.userService.getrestURL() + '/userRoles/delete', id);
  }
}
