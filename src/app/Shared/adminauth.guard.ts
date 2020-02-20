import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {
  constructor(private authService:AuthserviceService,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      return new Promise((resolve,reject)=>{
        if(this.authService.isAdminLoggedIn){
            return resolve(true);
        }
        else{
          this.router.navigate(['/admin']);
          return resolve(true);
        }
      });
    }
  }
  