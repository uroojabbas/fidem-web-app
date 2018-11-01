import { Component } from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fidem';

  constructor(private user: UserService, private userData: User) {}
}
