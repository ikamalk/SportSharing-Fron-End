import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) {}

  addRequest(request:Request):Promise<Request>{
    return this.http.post<Request>("http://localhost:1212/request/set",request).toPromise();
   }

   getAllRequest():Promise<Request[]>{
    return this.http.get<Request[]>("http://localhost:1212/request/getall").toPromise();
   }
   getRequestByAccountId(id:number):Promise<Request[]>{
    return this.http.get<Request[]>(`http://localhost:1212/request/${id}`).toPromise();
   }
}
