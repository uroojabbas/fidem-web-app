import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {RefdataService} from '../../common/refdata.service';
import {ClientComponent} from '../../client-management/client/client.component';
import {MatDialogRef} from '@angular/material';
import {DialogService} from '../../common/dialog.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public isLinear;

  constructor(private productService: ProductService,
              private refDataService: RefdataService,
              private dialogService: DialogService,
              private productDialog: MatDialogRef<ProductComponent>) { }

  ngOnInit() {
    this.isLinear = 'true';
  }

  getProductDetail(): any {
    this.productService.searchISBN();
  }

  closeForm() {
    this.productDialog.close();
  }


  onSubmit(): void {
    this.productService.save();
  }

  onClear(): void {
    this.productService.clearForm();
  }
}
