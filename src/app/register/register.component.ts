import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../Shared/authservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthserviceService,private router:Router) { }
  errorMessage:string;
  successMessage:string;
  errFlag:boolean=false;
  successFlag:boolean=false;
  ngOnInit() {
  }
  RegisterForm=new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  }  
  );
  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.successFlag=true;
      setTimeout(()=>{this.router.navigate(['/login'])},10);
    }, err => {
      this.errorMessage = err.message;
      this.successMessage = "";
      this.errFlag=true;
    })
  }

}
