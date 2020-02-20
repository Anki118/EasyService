import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthserviceService } from './Shared/authservice.service';
import{ AngularFireDatabaseModule} from '@angular/fire/database'
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenueComponent } from './menue/menue.component';
import{FetchmenueService} from './Shared/fetchmenue.service';
import { InvoiceComponent } from './invoice/invoice.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    HomeComponent,
    HeaderComponent,
    MenueComponent,
    InvoiceComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
   
    
  ],
  providers: [AuthserviceService,FetchmenueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
