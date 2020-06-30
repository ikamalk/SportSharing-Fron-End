import { Component, OnInit, Output, Input } from '@angular/core';
import { Request } from 'src/app/models/Request';
import { ParticipantService } from 'src/app/services/participant.service';
import { Account } from 'src/app/models/Account';
import { Participant } from 'src/app/models/Participant';
import * as moment from 'moment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input("events") events:Request[];
  account:Account;
  myParticipations:number[] = []; //list of id of request that the user joined
  newParticipant:Participant;
  constructor(private participantService:ParticipantService) {
    this.account = JSON.parse(localStorage.getItem("account"));

  }

  ngOnInit(): void {
  }


  getMyParticipationsFunc(){
    this.participantService.getParticipationByAccountId(this.account.id).then(myParticipations=>{
      myParticipations.forEach((participation=>{
       this.myParticipations.push(participation.request.id);
      }));
    });
  }

  stars(val) {
    const starPercentage = (val / 5) * 100;
    const starPercentageRounded = `${(starPercentage / 10) * 10}%`;
    return starPercentageRounded;

  }


  seePosition(index:number){
   /* this.onEventFocus =true;
    this.latitude = this.requests[index].lat-0.0015;
    this.longitude = this.requests[index].lng;
    this.zoom = 15;
    this.requests = [this.requests[index]];*/
  }

  join(request:Request){
    this.newParticipant = {
      id:0,
      request:request,
      accountId:this.account.id,
      age:moment().diff(this.account.birthday.split('T')[0], 'years',false),
      name:this.account.firstname + " " + this.account.lastname,
      phoneNumber:this.account.phoneNumber
    }
    this.participantService.addParticipant(this.newParticipant).then((resp)=>{
    //  this.getAllRequest();
    })
  }

}
