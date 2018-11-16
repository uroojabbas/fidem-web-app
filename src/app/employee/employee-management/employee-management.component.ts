import { Component, OnInit } from '@angular/core';
import {EmployeeserviceService} from '../employeeservice.service';
import {RefdataService} from '../../common/refdata.service';
import {UserService} from '../../user.service';
import {MatDialogRef} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '../../common/notification.service';

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

  public genderlist = [
    {id: 1, value: 'Male'},
    {id: 2, value: 'Female'},
    {id: 3, value: 'Other'}
    ];

  public cityList: any[];

  public regionList: any[];

  constructor(private employeeservice: EmployeeserviceService,
              private refDataService: RefdataService, private userService: UserService,
  private formDialog: MatDialogRef<EmployeeManagementComponent>,
              private notificationService: NotificationService) {



  }

  private setCityList(data: any) {
    this.cityList = data;
    }

  closeForm() {
    this.formDialog.close();
  }

  private setRegionList(data: any) {
    this.regionList = data;
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
     this.employeeservice.addEmployee().subscribe(data => this.showSuccessMessage(data),
       error => this.handleError(error));
  }

  showSuccessMessage(data: any) {

    this.notificationService.showSuccess(':: Employee Record Successfully Added.');
  }

  handleError(httpErrorResponse: HttpErrorResponse) {
    console.log('Error', httpErrorResponse.message);
    this.notificationService.showError(':: Error:' + httpErrorResponse.message);
  }
}
