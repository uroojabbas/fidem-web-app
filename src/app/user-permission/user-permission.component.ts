import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {UserPermissionService} from './user-permission.service';
import {NotificationService} from '../common/notification.service';
import {MatDialogRef} from '@angular/material';
import {UserService} from '../user.service';
import {HttpErrorResponse} from '@angular/common/http';




/**
 * User Role data with nested structure.
 * Each node has a role name and an optiona list of permission.
 */
interface RoleNode {
  name: string;
  id: number;
  roleAssignToUser: boolean;
  modulepermissionses?: RoleNode[];
}

/** Flat node with expandable and level information */
interface PermissionNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css'],
})


export class UserPermissionComponent implements OnInit {

  /** The selection for checklist */
  private checklistSelection = new SelectionModel<RoleNode>(true /* multiple */);

  private _transformer = (node: RoleNode, level: number) => {
    return {
      expandable: !!node.modulepermissionses && node.modulepermissionses.length > 0,
      name: node.name,
      roleAssignToUser: node.roleAssignToUser,
      id: node.id,
      level: level,
    };
  }

  private treeControl = new FlatTreeControl<PermissionNode>(
    node => node.level, node => node.expandable);

  private treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.modulepermissionses);

  private dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private user: UserService,
              private notificationService: NotificationService,
              private userPermissionService: UserPermissionService,
              private userRoleDialogRef: MatDialogRef<UserPermissionComponent>) {
    // this.dataSource.data = USER_ROLE_DATA;

    this.userPermissionService.getUserRoleList(this.userPermissionService.getUserId()).subscribe(data => this.setUserRoleData(data),
      error => this.notificationService.showError(error));
  }

  setUserRoleData(data) {
    this.dataSource.data = data;
  }
  ngOnInit() {
  }

  hasChild = (_: number, node: PermissionNode) => node.expandable;

  closeForm() {
    this.userRoleDialogRef.close();
  }

  selectRole(role: RoleNode): boolean {
    if (role.roleAssignToUser) {
      this.checklistSelection.toggle(role);
      return true;
    }
      return false;
  }

  changeRole(role: RoleNode) {
    this.checklistSelection.toggle(role);
    }

  onSubmit() {

    let userRoleList = []
    if (this.checklistSelection.selected.length > 0) {

    this.checklistSelection.selected.forEach((role, index) => {
      if (this.checklistSelection.isSelected(role)) {
        userRoleList.push(role.id);
      }
    });
    const userRoleObj = {
      'fromUserId': this.user.getUserId(),
      'forUserId': this.userPermissionService.getUserId(),
      'userRoles': userRoleList
    };
    this.userPermissionService.addUpdateRole(userRoleObj).subscribe(data => this.showSuccessMessage(data),
      error => this.handleError(error));
  } else {
      this.notificationService.showErrorMsg(':: Error: No Role Selected, Please select at least one Role');
    }
  }

  showSuccessMessage(data: any) {

    this.notificationService.showSuccess('User Role added Successfully Added');
  }

  handleError(httpErrorResponse: HttpErrorResponse) {
    console.log('Error', httpErrorResponse.message);
    this.notificationService.showErrorMsg(':: Error:' + httpErrorResponse.message);
  }
}
