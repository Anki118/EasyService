import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { AdminauthGuard } from '../Shared/adminauth.guard';

const Adminroutes: Routes = [

    {
      path: '',
      component: AdminComponent,
      children: [
        { path:'dashboard', component: AdminDashboardComponent,canActivate: [AdminauthGuard] },
        { path: '', component: AdminloginComponent }
      ]
    }
 
];


@NgModule({
  imports: [RouterModule.forChild(Adminroutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

