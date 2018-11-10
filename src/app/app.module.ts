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
  , MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatDatepickerToggle, MatCheckboxModule, MatDialogModule
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
    path: 'user-management',
    canActivate: [AuthguardGuard],
    component: UserManagementComponent
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
    EmployeeManagementComponent
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
    MatSortModule
  ],
  providers: [RefdataService,  User, UserService, AuthguardGuard, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ EmployeeManagementComponent ]
})
export class AppModule { }
