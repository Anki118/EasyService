import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import{AdminRoutingModule} from './admin-routing.module'
import { AdminComponent } from './admin.component';
@NgModule({
  declarations: [AdminComponent,AdminloginComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
