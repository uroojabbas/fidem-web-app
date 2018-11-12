import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public matSnackBar: MatSnackBar) { }
  config: MatSnackBarConfig = {
    duration: 6000,
    horizontalPosition: 'right',
    verticalPosition: 'top',


}
  showSuccess(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.matSnackBar.open(msg,'', this.config);

  }

  showError(msg) {
    this.config['panelClass'] = ['notification', 'failure'];
    this.matSnackBar.open(msg,'', this.config);

  }
}
