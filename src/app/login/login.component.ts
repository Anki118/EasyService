import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthserviceService } from '../Shared/authservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthserviceService,private router:Router) { }
  errorMessage:string;
  successMessage:string;
  errFlag:boolean=false;
  ngOnInit() {
  }
  LoginForm=new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  }  
  );
  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.authService.isUserLoggedIn=true;
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.errFlag=true;
    })
  }
  resetMsg(){
    this.errFlag=false;
  }
}
