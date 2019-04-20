import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../common/notification.service';
import {UserService} from '../../user.service';
import {InventoryComponent} from '../../inventory-management/inventory/inventory.component';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  dialogRef: any;

  constructor(private rolePermissionDialog: MatDialogRef<AddRoleComponent>,
              private notificationService: NotificationService,
              private changeDetectorRef: ChangeDetectorRef,
              private user: UserService) { }

  ngOnInit() {
  }

  onCloseDialog(): void {
    this.rolePermissionDialog.close();
  }
}
