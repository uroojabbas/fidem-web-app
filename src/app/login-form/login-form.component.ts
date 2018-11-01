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

  userData = new User();
  constructor(private userModel: User, private router: Router, private userService: UserService) { }

  ngOnInit() {
    console.log('hit');
  }

  loginUser() {
    event.preventDefault();
    console.log(this.userModel);
    this.userService.loginUser(this.userModel).subscribe(data => { console.log('Rest Api data',data);
    this.validateUser(data)
      },error => console.log('Error!', error));
  }

  private validateUser(data: any){

    this.userData = Object.assign(new User,data[0]);

    console.log("Pass !!", this.userData);

    console.log("Pass 2 !!", this.userData.id);
    if (this.userData.id > 0) {
      console.log(this.userData.name);
      // if (this.userModel.name === 'Ali') {
      this.userService.setUserLoggedIn();
      this.userData.isLoggedIn=true;
      this.router.navigate(['dashboard']);
      // }
    } else {
      return false;
    }
  }
}
