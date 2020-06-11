import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) {}


  addAccount(account:Account):Promise<Account>{
    return this.http.post<Account>("http://localhost:1212/register",account).toPromise();
   }
   getAccountSession(username:String){
    this.http.get(`http://localhost:1212/get/${username}`).toPromise().then(account=>{
      localStorage.setItem("account",JSON.stringify(account));
    });
   }
   removeAccountSession(){
    localStorage.removeItem("account");
  }
}
