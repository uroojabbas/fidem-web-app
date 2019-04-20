import { Component } from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {RefdataService} from './common/refdata.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PersonalInfoComponent} from './personal-info/personal-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fidem';

  constructor(private user: UserService, private userData: User,
              private refdataService: RefdataService,
              private dialog: MatDialog) {

  }

  showPersonalInfo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this.dialog.open(PersonalInfoComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('refresh page');
    });
  }
}
