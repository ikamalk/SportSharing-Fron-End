import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Account } from 'src/app/models/Account';
import { MapsAPILoader } from '@agm/core';
import { Marker } from 'src/app/models/Marker';
import { Request } from 'src/app/models/Request';
import * as moment from 'moment';

import { Participant } from 'src/app/models/Participant';
import { ParticipantService } from 'src/app/services/participant.service';
declare var google;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  private geocoder: any;
  latitude: number;
  longitude: number;
  zoom: number;
  requests:Request[] = [];
  markers:Marker[] = [];
  account:Account;
  style = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#EBE3CD"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#F5F1E6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#C9B2A6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#DCD2BE"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#AE9E90"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#B8AEA3"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#A9C763"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#DFD2AE"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817C"
        }
      ]
    },
    {
      "featureType": "poi.medical",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#F96053"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#18BC10"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#31F4EF"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#FFEB3B"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#D9D3D2"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#E9E8E2"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#F8C967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#E9BC62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#E98D58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#DB8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806B63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#DFD2AE"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8F7D77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#EBE3CD"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#DFD2AE"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#798DFD"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998D"
        }
      ]
    }
  ];
  loading:boolean = false;
  startLoading:boolean = false;
  pinslist:string[] = ["assets/pins/BaseballPin.png","assets/pins/BasketballPin.png","assets/pins/BowlingPin.png",
  "assets/pins/SoccerPin.png","assets/pins/FrisbeePin.png","assets/pins/TennisPin.png"];
  imgLoader:string=this.pinslist[5];
  newParticipant:Participant;
  myParticipations:number[] = []; //list of id of request that the user joined
  numberOfParticipations:number[] = []; //how much participation each request
  radius:number =10000;
  onEventFocus:boolean = false;
  isNoRequest:boolean = false;
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round((value/1.609) / 1000) + 'mi';
    }
    return value;
  }
  constructor(private requestService:RequestService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private participantService:ParticipantService,private cdr: ChangeDetectorRef) {
    this.account = JSON.parse(localStorage.getItem("account"));

    this.getAllRequest();

  }

  kmToMiles(km:number){
    return (km/1.609);
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

  startpins(){
    setTimeout(() => {
      this.pinslist.forEach((pin,i)=>{
        setTimeout(() => {
          this.imgLoader = pin;
          if(i == this.pinslist.length-1){
            setTimeout(() => {
              this.startpins();
            }, 250);
          }
        }, 500*(i));
      })
    }, 250);
  }
  ngAfterViewInit(){
    let i = 0;
    this.startLoading =true;
    this.startpins();
    this.cdr.detectChanges();

  }



  async getAllRequest(){
    this.onEventFocus = false;
   await this.setCurrentLocation();
   this.requestService.getAllRequest(this.latitude,this.longitude,this.radius/1609).then(requests=>{
    this.requests = requests.reverse();
    this.getMyParticipationsFunc();
      this.loading = true;
  })
  }

  setCurrentLocation() {
    return new Promise((resolved,rejected)=>{
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 11;
        resolved();
      },error=>{
        rejected();
      });
    })
     
  }






  /*showHideMarkers(){
    Object.values(this.markers).forEach((value,index) => {
      let condition =this.getDistanceBetween(value.lat,value.lng,this.latitude,this.longitude);
      value.isShown = condition;
      this.requests[index]['isShown'] = condition;
      if(index == this.markers.length -1) {
        this.isNoRequest =this.requests.every(this.isFalse);
      }
    });
  }*/

  isFalse(element:Request, index, array) {
    return element.isShown == false;
  }

  stars(val) {
    const starPercentage = (val / 5) * 100;
    const starPercentageRounded = `${(starPercentage / 10) * 10}%`;
    return starPercentageRounded;

  }

  seePosition(index:number){
    this.onEventFocus =true;
    this.latitude = this.requests[index].lat;
    this.longitude = this.requests[index].lng;
    this.zoom = 15;
    this.requests = [this.requests[index]];
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
      this.getAllRequest();
    })
  }
}
