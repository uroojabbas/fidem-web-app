import { Injectable, ElementRef } from '@angular/core';
import {RoleManagementDataSource, RoleManagementItem} from './user-role-datasource';

@Injectable({
  providedIn: 'root'
})
export class UserRoleServiceService {
  constructor( private dateSource: RoleManagementDataSource) { }

  addUser(userRec: RoleManagementItem): void {

  } }
