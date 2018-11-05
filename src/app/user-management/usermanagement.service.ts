import { Injectable } from '@angular/core';
import {UserManagementDataSource, UserManagementItem} from './user-management-datasource';
@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  constructor( private dateSource: UserManagementDataSource) { }

  addUser(userRec: UserManagementItem): void {

  }

}
