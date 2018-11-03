import { Injectable } from '@angular/core';
import {UserManagementDataSource, UserManagementItem} from './user-management-datasource';
@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  datasource: UserManagementDataSource;
  userRecord: UserManagementItem;

  constructor( ) { }

  addUser(userRec: UserManagementItem): void {

  }

}
