import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './Shared/auth.guard';
import { HomeComponent } from './home/home.component';
import { MenueComponent } from './menue/menue.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {path:'home',component:HomeComponent},
  {path : 'login', component:LoginComponent },//
  {path:'register',component:RegisterComponent},
  {path:'user',component:UserComponent,canActivate: [AuthGuard]},
  {path:'menue',component:MenueComponent,canActivate: [AuthGuard]},
  {path:'invoice',component:InvoiceComponent,canActivate:[AuthGuard]},
  {path:'logout',component:LogoutComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

                                  