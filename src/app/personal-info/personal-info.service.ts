import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PersonalInfoComponent} from './personal-info.component';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  constructor(private _http: HttpClient, private userService: UserService) { }

  public personalInfoForm: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  initializePersonalInfoForm() {
    this.personalInfoForm.setValue(
      {
        password: '',
        newPassword: '',
        confirmPassword: ''
      }
    );
  }

  updatePersonalInfo(): Observable<any> {
    if (this.personalInfoForm.valid) {
      console.log(this.personalInfoForm.value);
      return this._http.post<User>(this.userService.getrestURL() + '/user/add', this.personalInfoForm.value);
    }
  }
}
