import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url:string = environment.url;

  constructor(private http:HttpClient) {
  }


  login(username:string,password:string){
   return this.http.post(this.url+"authenticate",{username:username,password:password}).toPromise();
  }

  hello(){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.get(this.url+"hello",{ headers, responseType: 'text'}).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );

  }
}
