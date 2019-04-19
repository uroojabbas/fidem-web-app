import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  dialogRef: any;

  constructor() { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
