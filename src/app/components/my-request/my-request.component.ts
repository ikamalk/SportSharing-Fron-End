import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialog } from './requestDialog/request-dialog';
import { Account } from 'src/app/models/Account';
import { RequestService } from 'src/app/services/request.service';
import { MapsAPILoader } from '@agm/core';
import { Request } from 'src/app/models/Request';
import { Participant } from 'src/app/models/Participant';
import { ParticipantService } from 'src/app/services/participant.service';
declare var google;
@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.scss']
})
export class MyRequestComponent implements OnInit {
  private geocoder: any;
  account:Account;
  requests:Request[];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  participants:any[] =[];
  dataSource = [
    {position: 1, name: 'test 1', weight: 22, symbol: '-'},
    {position: 2, name: 'test 2', weight: 29, symbol: '-'},
    {position: 3, name: 'test 3', weight: 26, symbol: '-'},
  ];
  constructor(public dialog: MatDialog,private requestService:RequestService,
    private mapsAPILoader: MapsAPILoader,private participantService:ParticipantService) {
    this.account = JSON.parse(localStorage.getItem("account"));
    this.getRequestById(this.account.id);
  }

  getRequestById(id:number){
    this.participants = [];
    this.requestService.getRequestByAccountId(id).then(requests=>{
      this.requests = requests.reverse();
      requests.forEach(request=>{
        this.participantService.getParticipationByRequestId(request.id).then(participant=>{
          this.participants.push(participant);
        })
      });
      console.log(this.participants);
    })
  }

  deleteRequest(id:number){
    this.requestService.deleteRequest(id).then(()=>{
      this.getRequestById(this.account.id);

    })
  }

  openDialog(data) {
    const dialogRef = this.dialog.open(RequestDialog, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getRequestById(this.account.id);
    });
  }

  ngOnInit(): void {
  }


  stars(val) {
    const starPercentage = (val / 5) * 100;
    const starPercentageRounded = `${(starPercentage / 10) * 10}%`;
    return starPercentageRounded;
  }

}
