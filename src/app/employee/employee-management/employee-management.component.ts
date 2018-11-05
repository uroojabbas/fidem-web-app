import { Component, OnInit } from '@angular/core';
import {EmployeeserviceService} from '../employeeservice.service';
import {RefdataService} from '../../common/refdata.service';
import {UserService} from '../../user.service';
import {User} from '../../user';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  public departments = [
    {id: 1, value: 'Accounts'},
    {id: 2, value: 'Human Resource'},
    {id: 3, value: 'Sales'},
    {id: 4, value: 'Procurement'}
  ];

  public cityList: any[];


  public regionList: any[];

  constructor(private employeeservice: EmployeeserviceService,
              private refDataService: RefdataService, private userService: UserService) {



  }

  private setCityList(data: any) {
    this.cityList = data;
    console.log(this.cityList);
  }

  private setRegionList(data: any) {
    this.regionList = data;
    console.log(data);
  }
  ngOnInit() {
    this.refDataService.initCityList().subscribe(data => this.setCityList(data));
    this.refDataService.initRegionList().subscribe(data => this.setRegionList(data));
  }

  onClear() {
    this.employeeservice.employeeForm.reset();
    this.employeeservice.initializeEmployeeForm();
  }

  onSubmit() {
    // this.employeeservice.addEmployee();
     this.employeeservice.addEmployee().subscribe(data => console.log(data));
  }
}
