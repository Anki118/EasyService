import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public afAuth: AngularFireAuth,private authService:AuthserviceService,
    private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    return new Promise((resolve,reject)=>{
      this.authService.getCurrentUser()
      .then(user=>{
        return resolve(true);
      },
      err=>{
        this.router.navigate(['/login']);
        return resolve(true);
      })
    });
  }
}
