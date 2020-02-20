import { Component, OnInit, Input } from '@angular/core';
import{FetchmenueService} from '../Shared/fetchmenue.service';
import { UserCart } from '../Shared/user-cart';
import { Router} from '@angular/router';
@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.css']
})
export class MenueComponent implements OnInit {

  constructor(private fetchData:FetchmenueService,private router:Router) { 
   
  }
  cartItems:UserCart[]=[]
  finalPrice:number=0;
  isDataPresent:boolean=false;
  ngOnInit() {
    this.cartItems=this.fetchData.getCartItems();
    if(this.cartItems.length!=0){
      this.clcTotalPrice();
      this.isDataPresent=true
    }   
  }
  removeFromCart(cartItemVal){
    var isCartItemCountZero=false
    this.cartItems.forEach(data=>{
      if(data.cartItem==cartItemVal){
        data.quantity-=1;
        if(data.quantity>0){
          data.totprice=data.quantity*data.price;
        }else{
          isCartItemCountZero=true;
        }      
      }
    })
    if(isCartItemCountZero){
      var tempCartItems=this.cartItems;
      this.cartItems=[];
      tempCartItems.forEach(data=>{
        if(data.cartItem!=cartItemVal)
            this.cartItems.push(data);
      })
      if(this.cartItems.length==0){
        this.isDataPresent=false;
      }
      tempCartItems=[];
    }
    this.clcTotalPrice();
  }
  addMoreToCart(cartItemVal){
    this.cartItems.forEach(data=>{
      if(data.cartItem==cartItemVal){
        data.quantity+=1;
        data.totprice=data.quantity*data.price;
      }
    })
    this.clcTotalPrice();
  }
  clcTotalPrice(){
    this.finalPrice=0;
    this.cartItems.forEach(data=>{
      this.finalPrice+=data.totprice;
    })
  }
  getInvoice(){
    this.router.navigate(['/invoice']);
  }
}
