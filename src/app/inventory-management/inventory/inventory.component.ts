import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../inventory.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(public inventoryService: InventoryService,
              private inventoryDialog: MatDialogRef<InventoryComponent>) { }

  ngOnInit() {
  }


  closeForm() {
    this.inventoryDialog.close();
  }
}
