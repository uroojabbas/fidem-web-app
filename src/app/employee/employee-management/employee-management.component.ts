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


  public genderlist = [
    {id: 1, value: 'Male'},
    {id: 2, value: 'Female'},
    {id: 3, value: 'Other'}
    ];

  public departmentList: any[];

  public designationList: any[];

  public cityList: any[];

  public regionList: any[];

  public employeeList: any[];

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

  private setEmployeeList(data: any)
  {
    this.employeeList = data;
  }

  ngOnInit() {
    this.cityList = this.refDataService.getCityList();
    this.regionList = this.refDataService.getRegionList();
    this.departmentList = this.refDataService.getDepartmentList();
    this.designationList = this.refDataService.getDesignationList();
    this.employeeList = this.refDataService.getEmployeeList();
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

    this.notificationService.showSuccess('User Record Successfully Added');
  }

  handleError(httpErrorResponse: HttpErrorResponse) {
    console.log('Error', httpErrorResponse.message);
    this.notificationService.showErrorMsg(':: Error:' + httpErrorResponse.message);
  }
}
