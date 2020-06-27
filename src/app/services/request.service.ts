import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../models/Request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url:string = environment.url;

  constructor(private http:HttpClient) {}

  addRequest(request:Request):Promise<Request>{
    return this.http.post<Request>(this.url+"request/set",request).toPromise();
   }

   getAllRequest(latGPS:number,lngGPS:number,radius:number):Promise<Request[]>{
    return this.http.get<Request[]>(this.url+`request/getall/${latGPS}/${lngGPS}/${radius}`).toPromise();
   }
   getRequestByAccountId(id:number):Promise<Request[]>{
    return this.http.get<Request[]>(`${this.url}request/${id}`).toPromise();
   }

   updateRequest(request:Request){
    return this.http.post<Request>(this.url+"request/update",request).toPromise();
   }

   deleteRequest(id:number){
    return this.http.delete(`${this.url}request/${id}`).toPromise();
   }
}
