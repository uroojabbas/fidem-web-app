import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from './user';
import { map, catchError, tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {forkJoin} from 'rxjs';

@Injectable( {providedIn: 'root'} )
export class UserService {

  private isUserLoggedIn: boolean;
  private _url: string;
  constructor(private _http: HttpClient) {
    this.isUserLoggedIn = false;
    this._url = 'http://localhost:8080/users';
    // this._url = 'http://google.com'
  }
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  private extractData(res: Response) {
    let body = res;
    console.log("Response ", res)
    return body || { };
  }

  loginUser(user: User) : Observable<any>  {
    console.log('User service', user);
    return this._http.get('http://localhost:8080/users/' + user.name).pipe(map(this.extractData));
  }
}
