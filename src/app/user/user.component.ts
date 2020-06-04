import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../Shared/item';
import { FetchmenueService } from '../Shared/fetchmenue.service';
import { UserCart } from '../Shared/user-cart';
import { Data } from '../Shared/data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  items:Item[]=[];
  list:any;
  categoryList:any=[]
  
  constructor(private fetchData:FetchmenueService) { }

  ngOnInit() {
    this.fetchData.getData()
    .subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          value: item.payload.doc.data()
        } as unknown as Data
      }).map(data=>{
        var category:any=new Object();
        category.id=data.id;
        category.val=data.value;
        this.categoryList.push(category)
        var x=data.value
        for(let rec in x){
          var item=new Item();
          item.name=rec;
          item.price=x[rec]
          this.items.push(item)
        }
      })
    })
    var badge=document.getElementById('badgeId');
    badge.style.display='block';
  }

  setItems(itemName){
    this.items=[];
    for(let x in this.categoryList){
      if(this.categoryList[x].id==itemName){
        for (let y in this.categoryList[x].val){
            var item=new Item();
            item.name=y;
            item.price=this.categoryList[x].val[y]
            this.items.push(item);
        }
      }
     
      }
}
  getAllItems(){
    this.items=[];
    for(let x in this.categoryList){
        for (let y in this.categoryList[x].val){
            var item=new Item();
            item.name=y;
            item.price=this.categoryList[x].val[y]
            this.items.push(item);
        }
     
      }
  }
  addToCart(obj,price){
    var isItemAlreadyPresent=false;
    var alreadyAddedItemqty=0;
    var id=obj;
    var bttn=document.getElementById(id);
    bttn.style.display = 'none';
    id=id+'Id';
    var countObj=document.getElementById(id);
    countObj.style.display='block';
    if(this.fetchData.cartItems.length==0){
      var cartObj=new UserCart();
        cartObj.cartItem=obj;
        cartObj.quantity=1;
        cartObj.price=price;
        cartObj.totprice=price; 
        this.fetchData.cartItems.push(cartObj);
        this.fetchData.cartItemCount+=1;
        var badgeIdCount=document.getElementById('badgeIdCount');
        badgeIdCount.setAttribute('data-count',this.fetchData.cartItemCount.toString())
    }else{
      this.fetchData.cartItems.forEach(data=>{
        if(data.cartItem==obj){
          isItemAlreadyPresent=true;
          alreadyAddedItemqty=data.quantity;
        }
      }) 
      if(isItemAlreadyPresent){
        var id:any=obj+'Count';
        var quantityObj=document.getElementById(id);
        quantityObj.setAttribute('value',alreadyAddedItemqty.toString());
        this.addMoreToCart(obj,price);
      }
      else if(this.fetchData.cartItems.length!=0){
          var cartObj=new UserCart();
          cartObj.cartItem=obj;
          cartObj.quantity=1;
          cartObj.price=price;
          cartObj.totprice=price; 
          this.fetchData.cartItems.push(cartObj);
          this.fetchData.cartItemCount+=1;
          var badgeIdCount=document.getElementById('badgeIdCount');
          badgeIdCount.setAttribute('data-count',this.fetchData.cartItemCount.toString())
        }
    }  
  }

  removeFromCart(obj,price:number){
    var id=obj+'Count';
    var quantityObj=document.getElementById(id);
    var quantity=quantityObj.getAttribute('value');
    var qty:number=parseInt(quantity);
    if(qty>1){
      qty=qty-1;
      quantityObj.setAttribute('value',qty.toString());
      this.updateCart(obj,qty,price);
    }
  }
  addMoreToCart(obj,price){
    var id=obj+'Count';
    var quantityObj=document.getElementById(id);
    var quantity=quantityObj.getAttribute('value');
    var qty:number=parseInt(quantity);
    qty=qty+1;
    quantityObj.setAttribute('value',qty.toString())
    this.updateCart(obj,qty,price);
   
  }
  updateCart(item,qty,price){
      this.fetchData.cartItems.forEach(data=>{
        if(data.cartItem==item){
          data.quantity=qty;
          data.totprice=price*qty;
        }
      })
  }
}
