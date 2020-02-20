import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  isAdminLoggedIn:boolean=false;
  isUserLoggedIn:boolean=false;
  constructor(public afAuth: AngularFireAuth,private router:Router) { }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
  doLogin(value){
    return new Promise<any>((resolve,reject)=>{
        firebase.auth().signInWithEmailAndPassword(value.email,value.password)
        .then(res=>{
          resolve(res);},
          err=>reject(err)
      )
    });
  }
  getCurrentUser(){
    return new Promise<any>((resolve,reject)=>{
      var user=firebase.auth().onAuthStateChanged(function(user){
          if(user){
            resolve(user);
          }else{
            reject('No user logged in')
          }
      })
    })
  }
  signout(){
    
      firebase.auth().signOut().then(()=>{
        this.isUserLoggedIn=false;
        this.router.navigate(['logout'])
      })
    
  }
}
