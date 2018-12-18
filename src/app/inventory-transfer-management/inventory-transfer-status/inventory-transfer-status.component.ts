import { Component, OnInit } from '@angular/core';
import {InventoryTransferService} from '../inventory-transfer.service';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../common/notification.service';

@Component({
  selector: 'app-inventory-transfer-status',
  templateUrl: './inventory-transfer-status.component.html',
  styleUrls: ['./inventory-transfer-status.component.css']
})
export class InventoryTransferStatusComponent implements OnInit {

  constructor(private inventoryTransferService: InventoryTransferService,
              private inventoryTransferStatusDialog: MatDialogRef<InventoryTransferStatusComponent>,
              private notificationService: NotificationService) { }

  ngOnInit() {
  }

  public closeForm() {
    this.inventoryTransferStatusDialog.close();
  }

  approveTO() {
    this.inventoryTransferService.approveTO().subscribe(data => {
        this.notificationService.showSuccess('Transfer Order Approved');
        setTimeout(() => this.inventoryTransferStatusDialog.close(),3000); } ,
      error => this.notificationService.showError(error));
  }

  rejectTO() {
    this.inventoryTransferService.rejectTO().subscribe(data => {
        this.notificationService.showSuccess('Transfer Order Rejected');
        setTimeout(() => this.inventoryTransferStatusDialog.close(),3000); // 2500 is millisecond
      } ,
      error => this.notificationService.showError(error));
  }

  dispatchTO() {
    this.inventoryTransferService.dispatchTO().subscribe(data => {
        this.notificationService.showSuccess('Transfer Order Dispatched');
        setTimeout(() => this.inventoryTransferStatusDialog.close(),3000); // 2500 is millisecond
      } ,
      error => this.notificationService.showError(error));
  }

  receivedTO() {
    this.inventoryTransferService.receivedTO().subscribe(data => {
        this.notificationService.showSuccess('Transfer Order Dispatched');
        setTimeout(() => this.inventoryTransferStatusDialog.close(),3000); // 2500 is millisecond
      } ,
      error => this.notificationService.showError(error));
  }

  cancelTO() {
    this.inventoryTransferService.cancelTO().subscribe(data => {
        this.notificationService.showSuccess('Transfer Order Cancelled');
        setTimeout(() => this.inventoryTransferStatusDialog.close(),3000) } ,
      error => this.notificationService.showError(error));
  }
}
