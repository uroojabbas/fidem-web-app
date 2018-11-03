import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../user';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private userModel: User, private router: Router, private userService: UserService) { }

  ngOnInit() {
    console.log('hit');
  }

  loginUser() {
    event.preventDefault();
    console.log(this.userModel);
    this.userService.loginUser(this.userModel).subscribe(data => { console.log('Rest Api data', data);
    this.validateUser(data);
      },error => console.log('Error!', error));
  }

  private validateUser(data: any) {

    this.userModel = Object.assign(new User, data);

    console.log("Pass !!", this.userModel);

    console.log("Pass 2 !!", this.userModel.username);
    if (this.userModel.id > 0) {
      console.log(this.userModel.name);
      // if (this.userModel.name === 'Ali') {
      this.userService.setUserLoggedIn();
      this.userService.setUserName(this.userModel.name);
      this.router.navigate(['dashboard']);
      // }
    } else {
      return false;
    }
  }
}
