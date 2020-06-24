import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  isAuthenticated:boolean = false;
  url:string = environment.url;

  constructor(public http: HttpClient, public router: Router) {}


  login(username:string,password:string){
    return this.http.post(this.url+"authenticate",{username:username,password:password}).toPromise();
   }


   public isAuthenticatedFunc(): boolean {
    JSON.parse(localStorage.getItem('account')) == null
      ? (this.isAuthenticated = false)
      : (this.isAuthenticated = true);
    return this.isAuthenticated;
  }

  canActivate(): boolean {
    if (!this.isAuthenticatedFunc()) {
      console.log(this.isAuthenticated);
      this.router.navigateByUrl('/');
      return false;
    }
    //this.router.navigateByUrl('/dashboard');
    return true;
  }
}
