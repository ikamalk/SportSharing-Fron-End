import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) {
  }


  login(username:string,password:string){
   return this.http.post("http://localhost:1212/authenticate",{username:username,password:password}).toPromise();
  }

  hello(){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.get("http://localhost:1212/hello",{ headers, responseType: 'text'}).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );

  }
}
