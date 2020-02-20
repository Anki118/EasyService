import { Component, OnInit } from '@angular/core';
import { Customer } from '../Shared/customer';
import { UserCart } from '../Shared/user-cart';
import { FetchmenueService } from '../Shared/fetchmenue.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private service:FetchmenueService,private router:Router) { }
  customerObj:Customer;
  TotalPriceDisplay:number=0;
  dicountAmount:number=0;
  cartItems:UserCart[]=[]
  showInvoice:boolean=false
  isDataPresent:boolean=true;
  ngOnInit() {
    this.customerObj=new Customer();
    this.cartItems=this.service.getCartItems()
    this.cartItems.forEach(data=>{
      this.TotalPriceDisplay+=data.totprice;
    })
    this.dicountAmount=(this.TotalPriceDisplay*10)/100;
    this.TotalPriceDisplay-=this.dicountAmount;
  }
  genInvoice(){
    if(this.cartItems.length!=0)
      this.showInvoice=true
    else
      this.isDataPresent=false
  }
  gotoMenue(){
    this.service.cartItemCount=0;
    this.service.cartItems=[];
    this.router.navigate(['/user'])
    
  }
}
