import { Injectable } from '@angular/core';
import { Participant } from '../models/Participant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http:HttpClient) { }



  addParticipant(participant:Participant):Promise<Participant>{
    return this.http.post<Participant>("http://localhost:1212/participant/set",participant).toPromise();
   }

   getParticipationByAccountId(id:number):Promise<Participant[]>{
    return this.http.get<Participant[]>(`http://localhost:1212/participant/account/${id}`).toPromise();
   }

   getParticipationByRequestId(id:number):Promise<Participant[]>{
    return this.http.get<Participant[]>(`http://localhost:1212/participant/request/${id}`).toPromise();
   }
}
