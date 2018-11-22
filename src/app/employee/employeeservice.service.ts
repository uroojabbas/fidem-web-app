import { Injectable } from '@angular/core';
import {FormGroup, FormControl,  Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {Observable} from 'rxjs';
import {User} from '../user';
import {RefdataService} from '../common/refdata.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  constructor(private _http: HttpClient, private userService: UserService,
              private refDataService: RefdataService) { }

  public employeeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phone: new FormControl(null, Validators.minLength(11)),
    address: new FormControl(null, Validators.required),
    cityid: new FormControl(1, ),
    regionid: new FormControl(1, Validators.required),
    departmentname: new FormControl(1, Validators.required),
    hiredate: new FormControl(''),
    ispermanent: new FormControl(false),
    gender: new FormControl(1),
    username: new FormControl(null, Validators.required),
    designationname:  new FormControl(null, Validators.required)
  });

  initializeEmployeeForm() {
    this.employeeForm.setValue(
      {
        id: null,
        name: '',
        email: '',
        phone: '',
        address: '',
        cityid: 1,
        regionid: 1,
        departmentname: 1,
        hiredate: null,
        ispermanent: false,
        gender: null,
        username: '',
        designationname: null
      }
    );
  }

  addEmployee(): Observable<any> {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
       return this._http.post<User>(this.userService.getrestURL() + '/user/add', this.employeeForm.value);
    }
  }

  populateForm(employee) {
    this.employeeForm.setValue({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      cityid: employee.cityid,
      regionid: employee.regionid,
      departmentname: employee.departmentname,
      hiredate: employee.hiredate,
      ispermanent: true,
      gender: employee.gender,
      username: employee.username,
      designationname: employee.designationname
    });

   }
}
