import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NotificationService} from '../../common/notification.service';
import {UserService} from '../../user.service';
import {UserRoleServiceService} from '../user-role-service.service';

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

  public listData: MatTableDataSource<PermissionElement>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    // public displayedColumns = ['moduleName'];
  public displayedColumns = ['select', 'permissionType', 'moduleName'];
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<PermissionElement>(true, []);

  constructor(private rolePermissionDialog: MatDialogRef<AddRoleComponent>,
              private notificationService: NotificationService,
              private changeDetectorRef: ChangeDetectorRef,
              private user: UserService,
              private userRoleService: UserRoleServiceService) { }

  ngOnInit() {
    this.initModulePermissionList();
  }

  initModulePermissionList(): void {
    this.userRoleService.getModulePermissionList().subscribe(data => this.setModulePermissionList(data),
      error => this.notificationService.showError(error));
  }

  setModulePermissionList(data: any): void {

    this.listData = new MatTableDataSource(data);

    this.listData.sort = this.sort;
    this.notificationService.showSuccess('Product List Loaded');
  }

  /** Whether the number of selected elements matches the total number of rows. */
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

  onCloseDialog(): void {
    this.rolePermissionDialog.close();
  }

  onCreate() {

    let userRolePermission: any[] = [];

    this.selection.selected.forEach( selected => {
      const tempPermission = {
      id: selected.permissionTypeId,
        permissionType: selected.permissionType,
        isdeleted: false
    };
      userRolePermission.push(tempPermission); });

    const userRole =         {
      id: null,
      roleName: this.userRoleService.userRoleForm.get('roleName').value,
      isDeleted: false,
      insertedtime: null,
      insertedbyuserid: this.user.getUserId(),
      modifiedbyuserid: null,
      modifiedtime: null,
      modulepermissionses: userRolePermission
    };

    this.userRoleService.saveUserRole(userRole).subscribe(data => this.notificationService.showSuccess('User Role Added Successfully'),
      error => this.notificationService.showError(error));;
  }
}
