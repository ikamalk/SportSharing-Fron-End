import { Injectable } from '@angular/core';
import { Participant } from '../models/Participant';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  url:string = environment.url;

  constructor(private http:HttpClient) { }



  addParticipant(participant:Participant):Promise<Participant>{
    return this.http.post<Participant>(this.url+"participant/set",participant).toPromise();
   }

   getParticipationByAccountId(id:number):Promise<Participant[]>{
    return this.http.get<Participant[]>(`${this.url}participant/account/${id}`).toPromise();
   }

   getParticipationByRequestId(id:number):Promise<Participant[]>{
    return this.http.get<Participant[]>(`${this.url}participant/request/${id}`).toPromise();
   }
}
