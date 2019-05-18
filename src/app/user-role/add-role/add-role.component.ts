import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatTableDataSource, MatSort} from '@angular/material';
import {NotificationService} from '../../common/notification.service';
import {UserService} from '../../user.service';
import { AddroleService } from './addrole.service';
import { SelectionModel } from '@angular/cdk/collections';

export interface PermissionElement {
  moduleName: string;
  permissionTypeId: number;
  moduleId: number;
  permissionType: string;
}
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  dialogRef: any;
  panelOpenState = false;
  public listData: MatTableDataSource<PermissionElement>;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ['select','moduleName', 'permissionType'];
  selection = new SelectionModel<PermissionElement>(true, []);

  constructor(private rolePermissionDialog: MatDialogRef<AddRoleComponent>,
              private notificationService: NotificationService,
              private changeDetectorRef: ChangeDetectorRef,
              private user: UserService, private addRoleService: AddroleService) { }

  ngOnInit() {
    this.initModulePermissionList();
  }

  initModulePermissionList(): void {

    this.addRoleService.getModulePermissionList().subscribe(data => this.setModulePermissionList(data),
      error => this.notificationService.showError(error));
   }
    setModulePermissionList(data: any): void {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.notificationService.showSuccess('Permission List Loaded');
    }

    closeRoleDialog(): void {
    this.rolePermissionDialog.close();
  }
  addUserRole(): void {
     const userRolePermission: any[] = [];

    this.selection.selected.forEach( selected => {
      const tempPermission = {
      id: selected.permissionTypeId,
        permissionType: selected.permissionType,
        isdeleted: false
    };
      userRolePermission.push(tempPermission); });
    const userRole =         {
      roleName: this.addRoleService.userRoleForm.get('roleName').value,
      insertedbyuserid: this.user.getUserId(),
      modifiedbyuserid: this.user.getUserId(),
      modulepermissionses: userRolePermission
    };
    if (this.addRoleService.userRoleForm.valid) {
      this.addRoleService.saveUserRole(userRole).subscribe(response => this.notificationService.showSuccess('User Role added successfully'),
        error => this.notificationService.showError(error));
    } else {
      this.notificationService.showErrorMsg('Invalid Form');
    }

    }

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      let dataLength = -1;
      if (this.listData !== undefined) {
        dataLength = this.listData.data.length;
      }
      const numRows = dataLength;
      return numSelected === numRows;
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.listData.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PermissionElement): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.permissionTypeId + 1}`;
    }
    updateUserRole(): void
    {
      const userRolePermission: any[] = [];

      this.selection.selected.forEach( selected => {
        const tempPermission = {
        id: selected.permissionTypeId,
          permissionType: selected.permissionType,
          isdeleted: false
      };
        userRolePermission.push(tempPermission); });
      const userRole =         {
        roleName: this.addRoleService.userRoleForm.get('roleName').value,
        insertedbyuserid: this.user.getUserId(),
        modifiedbyuserid: this.user.getUserId(),
        modulepermissionses: userRolePermission
      };
      if (this.addRoleService.userRoleForm.valid) {
        this.addRoleService.editUserRole(userRole).subscribe(response => this.notificationService.showSuccess('User Role Updated successfully'),
          error => this.notificationService.showError(error));
      } else {
        this.notificationService.showErrorMsg('Invalid Form');
      }

    }
}
