import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import { MatDialogConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogConfig: MatDialogConfig;

  constructor(private dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.width = '390px';
    this.dialogConfig.panelClass = 'confirm-dialog-container';
    this.dialogConfig.disableClose = true;

  }


  openConfirmDialog(message: string)  {
    this.dialogConfig.data = {message: message};

    return this.dialog.open(DialogComponent, this.dialogConfig);
  }
}
