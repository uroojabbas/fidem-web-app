import { Component, OnInit } from '@angular/core';
import {PersonalInfoService} from './personal-info.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {EmployeeManagementComponent} from '../employee/employee-management/employee-management.component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(private personalInfoService: PersonalInfoService,
              private formDialog: MatDialogRef<PersonalInfoComponent>) { }

  ngOnInit() {
  }

  closePersonalInfoDialog() {
    this.formDialog.close();
  }
}
