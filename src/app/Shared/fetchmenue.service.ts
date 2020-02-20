import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserCart } from './user-cart';
import { Item } from './item';
@Injectable({
  providedIn: 'root'
})
export class FetchmenueService {
  //public data:Observable<any[]>
  cartItems:UserCart[]=[];
  cartItemCount:number=0;
  discount:number;
  constructor(private _db:AngularFirestore) { 
   
  }
  
  getData():any{
    return this._db.collection('items').snapshotChanges();//.doc(itemType)
   
  }
  getCartItems(){
    return this.cartItems
  }
  updatedata(keyname,price,key){
    
    this._db.doc('items/'+key).update({[keyname]:price})
  }
}
