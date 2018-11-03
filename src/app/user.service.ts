import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from './user';
import { map, catchError, tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {forkJoin} from 'rxjs';
import {Router} from '@angular/router';

@Injectable( {providedIn: 'root'} )
export class UserService {

  private isUserLoggedIn: boolean;
  private userName: string;
  private _url: string;
  private componentName: string;

  constructor(private _http: HttpClient, private router: Router ) {
    this.isUserLoggedIn = false;
    this._url = 'http://localhost:8080/users';
    // this._url = 'http://google.com'
  }

  getComponentName(): string {
   return this.componentName;
  }

  setComponentName(componentName: string) {
    this.componentName = componentName;
  }
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  setUserName(userName: string){
    this.userName = userName;
  }

  getUserName(): string {
    return this.userName;
  }
  getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  private extractData(res: Response) {
    let body = res;
    console.log("Response ", res)
    return body || { };
  }

  loginUser(user: User): Observable<any>  {
    console.log('User service', user);
    // return this._http.get('http://localhost:8080/users/' + user.name).pipe(map(this.extractData));
    return this._http.post<User>('http://localhost:8080/user/login', user);
  }

  public navigate(url: string) {
    this.router.navigate([url]);
  }
}
