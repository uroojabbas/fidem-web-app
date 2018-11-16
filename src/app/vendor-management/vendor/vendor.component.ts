import { Component, OnInit } from '@angular/core';
import {VendorService} from '../vendor.service';
import {MatDialogRef} from '@angular/material';
import {DialogService} from '../../common/dialog.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  constructor(private vendorService: VendorService,
              private dialogService: DialogService,
              private formDialog: MatDialogRef<VendorComponent>) { }

  ngOnInit() {
  }

  closeForm() {
    this.formDialog.close();
  }

  onSubmit(): void {
    this.vendorService.save();
  }

  onClear(): void {
    this.vendorService.clearForm();
  }

}
