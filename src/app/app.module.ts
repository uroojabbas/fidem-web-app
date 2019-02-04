import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {
  MatExpansionModule
  , MatSidenavModule
  , MatToolbarModule
  , MatCardModule
  , MatIconModule
  , MatButtonModule
  , MatTooltipModule
  , MatTableModule
  , MatPaginatorModule
  , MatSortModule
  , MatGridListModule
  , MatSnackBarModule
  , MatInputModule
  , MatRadioModule
  , MatListModule
  , MatStepperModule
  , MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatDatepickerToggle, MatCheckboxModule, MatDialogModule,
  MatAutocompleteModule
} from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthguardGuard} from './authguard.guard';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes } from '@angular/router';
import {UserService} from './user.service';
import {DatePipe} from "@angular/common";
import {User} from './user';
import { VendorManagementComponent } from './vendor-management/vendor-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EmployeeManagementComponent } from './employee/employee-management/employee-management.component';
import {EmployeeserviceService} from './employee/employeeservice.service';
import {RefdataService} from './common/refdata.service';
import { DialogComponent } from './dialog/dialog.component';
import {Vendor} from './vendor-management/vendor';
import { VendorComponent } from './vendor-management/vendor/vendor.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { ClientComponent } from './client-management/client/client.component';
import {ClientService} from './client-management/client.service';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductComponent } from './product-management/product/product.component';
import {ProductService} from './product-management/product.service';
import { PurchaseOrderManagementComponent } from './purchase-order-management/purchase-order-management.component';
import { PurchaseOrderComponent } from './purchase-order-management/purchase-order/purchase-order.component';
import {CommonService} from './common/common.service';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { InventoryComponent } from './inventory-management/inventory/inventory.component';
import { InventoryTransferComponent } from './inventory-management/inventory-transfer/inventory-transfer.component';
import { InventoryTransferManagementComponent } from './inventory-transfer-management/inventory-transfer-management.component';
import { InventoryTransferStatusComponent } from './inventory-transfer-management/inventory-transfer-status/inventory-transfer-status.component';
import { GoodsReceivedNoteComponent } from './goods-received-note/goods-received-note.component';
import { GoodsReceivedNoteDetailComponent } from './goods-received-note/goods-received-note-detail/goods-received-note-detail.component';
import {GoodsReceivedNoteServiceService} from './goods-received-note/goods-received-note-service.service';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: DashboardComponent
  },
  {
    path: 'vendor',
    canActivate: [AuthguardGuard],
    component: VendorManagementComponent
  },
  {
    path: 'client',
    canActivate: [AuthguardGuard],
    component: ClientManagementComponent
  },
  {
    path: 'user-management',
    canActivate: [AuthguardGuard],
    component: UserManagementComponent
  },
  {
    path: 'product',
    canActivate: [AuthguardGuard],
    component: ProductManagementComponent
  },
  {
    path: 'purchase-order',
    canActivate: [AuthguardGuard],
    component: PurchaseOrderManagementComponent
  },
  {
    path: 'inventory',
    canActivate: [AuthguardGuard],
    component: InventoryManagementComponent
  },
  {
    path: 'inventory-transfer',
    canActivate: [AuthguardGuard],
    component: InventoryTransferManagementComponent
  },
  {
    path: 'goods-received-note',
    canActivate: [AuthguardGuard],
    component: GoodsReceivedNoteComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginFormComponent,
    DashboardComponent,
    VendorManagementComponent,
    UserManagementComponent,
    EmployeeManagementComponent,
    VendorComponent,
    DialogComponent,
    VendorComponent,
    ClientManagementComponent,
    ClientComponent,
    ProductManagementComponent,
    ProductComponent,
    PurchaseOrderManagementComponent,
    PurchaseOrderComponent,
    InventoryManagementComponent,
    InventoryComponent,
    InventoryTransferComponent,
    InventoryTransferManagementComponent,
    InventoryTransferStatusComponent,
    GoodsReceivedNoteComponent,
    GoodsReceivedNoteDetailComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatGridListModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatStepperModule,
    MatAutocompleteModule
  ],
  providers: [ClientService, Vendor, RefdataService,  User, UserService, AuthguardGuard, DatePipe, ProductService,
  EmployeeserviceService, CommonService, GoodsReceivedNoteServiceService],
  bootstrap: [AppComponent],
  entryComponents: [ VendorComponent, EmployeeManagementComponent, DialogComponent,
  ClientComponent, ProductComponent, PurchaseOrderComponent, InventoryComponent,
    InventoryTransferComponent, InventoryTransferStatusComponent, GoodsReceivedNoteDetailComponent]
})
export class AppModule { }
