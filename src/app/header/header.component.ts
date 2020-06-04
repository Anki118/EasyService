import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../Shared/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authservice:AuthserviceService) { }
  flag:boolean;
  ngOnInit() {
    this.flag=this.authservice.isUserLoggedIn;
  }
  logout(){
    this.authservice.signout();
  }
  
}
