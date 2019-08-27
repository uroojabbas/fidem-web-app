import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from './user';
import { map, catchError, tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {forkJoin} from 'rxjs';
import {Router} from '@angular/router';
import {PersonalInfoComponent} from './personal-info/personal-info.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Injectable( {providedIn: 'root'} )
export class UserService {

  private isUserLoggedIn: boolean;
  private userName: string;
  private userId: number;
  private _url: string;
  private _webURL: string;
  private componentName: string;
  private pageSize: number;

  constructor(private _http: HttpClient, private router: Router) {
    this.isUserLoggedIn = false;
    this._url = 'http://localhost:8080';
    this._webURL = 'http://localhost:4200';
    // this._url = 'http://google.com'
    this.pageSize = 17;
  }

  public getwebURL(): string {
    return this._webURL;
  }
  public getrestURL(): string {
    return this._url;
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

  setUserId(id: number): void {
    this.userId = id;
  }

  getUserId(): number {
    return this.userId;
  }
  private extractData(res: Response) {
    let body = res;
    console.log("Response ", res)
    return body || { };
  }

  public loginUser(user: User): Observable<any>  {
    console.log('User service', user);
    // return this._http.get('http://localhost:8080/users/' + user.name).pipe(map(this.extractData));
    return this._http.post<User>('http://localhost:8080/user/login', user);
  }

  public deleteUser(id: number): Observable<any>  {
    console.log('User service', id);
    // return this._http.get('http://localhost:8080/users/' + user.name).pipe(map(this.extractData));
    return this._http.post<User>('http://localhost:8080/user/delete', id);
  }

  public getUserById(id: number): Observable<any>  {
    console.log('User service', id);
    return this._http.get('http://localhost:8080/user/' + id).pipe(map(this.extractData));
  }

  public navigate(url: string) {
    this.router.navigate([url]);
  }
}
