import { Component, OnInit } from '@angular/core';
import {ClientService} from '../client.service';
import {DialogService} from '../../common/dialog.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private clientService: ClientService,
              private dialogService: DialogService,
              private formDialog: MatDialogRef<ClientComponent>) { }

  ngOnInit() {
  }

  closeForm() {
    this.formDialog.close();
  }

  onSubmit(): void {
    this.clientService.save();
  }

  onClear(): void {
    this.clientService.clearForm();
  }

}
