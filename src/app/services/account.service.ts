import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url:string = environment.url;
  constructor(private http:HttpClient) {}


  addAccount(account:Account):Promise<Account>{
    return this.http.post<Account>(this.url+"register",account).toPromise();
   }

   updateAccount(account:Account):Promise<Account>{
    return this.http.post<Account>(this.url+"account/update",account).toPromise();
   }
   getAccountSession(username:String){
    this.http.get(`${this.url}account/get/${username}`).toPromise().then(account=>{
      localStorage.setItem("account",JSON.stringify(account));
    });
   }
   removeAccountSession(){
    localStorage.removeItem("account");
  }
}
