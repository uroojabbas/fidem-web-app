import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {UserPermissionService} from './user-permission.service';
import {NotificationService} from '../common/notification.service';
import {MatDialogRef} from '@angular/material';




/**
 * User Role data with nested structure.
 * Each node has a role name and an optiona list of permission.
 */
interface RoleNode {
  name: string;
  id: number;
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

  private _transformer = (node: RoleNode, level: number) => {
    return {
      expandable: !!node.modulepermissionses && node.modulepermissionses.length > 0,
      name: node.name,
      id: node.id,
      level: level,
    };
  }

  /** The selection for checklist */
  private checklistSelection = new SelectionModel<RoleNode>(true /* multiple */);

  private treeControl = new FlatTreeControl<PermissionNode>(
    node => node.level, node => node.expandable);

  private treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.modulepermissionses);

  private dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private notificationService: NotificationService,
              private userPermissionService: UserPermissionService,
              private userRoleDialogRef: MatDialogRef<UserPermissionComponent>) {
    // this.dataSource.data = USER_ROLE_DATA;

    this.userPermissionService.getUserRoleList().subscribe(data => this.setUserRoleData(data),
      error => this.notificationService.showError(error));
  }

  setUserRoleData(data) {
    this.dataSource.data = data;
  }
  ngOnInit() {
  }

  hasChild = (_: number, node: PermissionNode) => node.expandable;

  closeForm() {
    alert(this.checklistSelection.selected.values());
    this.userRoleDialogRef.close();
  }
  selectRole(role: RoleNode) {
    this.checklistSelection.select(role);
  }

  changeRole(role: RoleNode) {
    this.checklistSelection.isSelected(role) ? this.checklistSelection.deselect(role) : this.checklistSelection.select(role);
   }

  onSubmit() {
    let map = new Map();

    this.checklistSelection.selected.forEach((role,index) => map.set(role.id,this.userPermissionService.getUserId()));
  }
}
