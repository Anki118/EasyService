import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/Shared/authservice.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private router:Router,private authService:AuthserviceService) { }
  errorMessage:string;
  errFlag:boolean;false;
  ngOnInit() {
  }
  LoginForm=new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });
  tryLogin(value){
    if(value.email=="abc@gmail.com" && value.password=="abc@123"){
      this.errFlag=false;
      this.authService.isAdminLoggedIn=true;
      this.router.navigate(['/admin/dashboard']);
    }else{
      this.errFlag=true;
      this.errorMessage="Invalid email or password"
    } 
  }
  resetMsg(){
    this.errFlag=false;
  }
}
