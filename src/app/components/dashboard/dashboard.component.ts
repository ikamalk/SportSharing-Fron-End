import { Component, OnInit, NgZone } from '@angular/core';
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
  requests:Request[];
  markers:Marker[] = [];
  account:Account;
  style = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c1ffb8"
        }
      ]
    },
    {
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#c1ffb8"
        }
      ]
    },
    {
      "elementType": "labels",
      "stylers": [
        {
          "color": "#b82e2e"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#007004"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#99ff8a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#75ff8c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#420000"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#700000"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        {
          "color": "#31b51c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#90b6b4"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
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
  myParticipations:number[] = [];
  onEventFocus:boolean = false;
  constructor(private requestService:RequestService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private participantService:ParticipantService) {
    this.account = JSON.parse(localStorage.getItem("account"));

    this.getAllRequest();
  }

  ngOnInit(): void {

  }


  getMyParticipationsFunc(){
    this.participantService.getParticipationByAccountId(this.account.id).then(myParticipations=>{
      console.log(myParticipations);
      myParticipations.forEach((participation=>{
        
       this.myParticipations.push(participation.request.id);
      }));
      console.log(this.myParticipations);
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
  }

  generateMarker(){
    this.markers =[];
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder;
      this.requests.forEach((request,i) => {
        setTimeout(() => {
          this.geocodeAddress(request['address'],request['sport_type']);
        }, 100*i);
        console.log("look");
        
        console.log(request);
        
      });
      console.log(this.markers);
      console.log(this.requests);

   });
  }

  getAllRequest(){
    this.onEventFocus = false;
    this.setCurrentLocation();
    this.requestService.getAllRequest().then(requests=>{
      this.requests = requests;
     // console.log(this.requests);
      this.generateMarker();
      this.getMyParticipationsFunc();
      setTimeout(() => {
        this.loading = true;
      }, 2000);
    })
  }


  setCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 11;
      });
  }

  stars(val) {
    const starPercentage = (val / 5) * 100;
    const starPercentageRounded = `${(starPercentage / 10) * 10}%`;
    return starPercentageRounded;

  }

  seePosition(index:number){
    this.onEventFocus =true;
    this.markers = [this.markers[index]];
    this.latitude = this.markers[0].lat;
    this.longitude = this.markers[0].lng;
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
    console.log(this.newParticipant);
    this.participantService.addParticipant(this.newParticipant).then((resp)=>{
      this.getAllRequest();
    })
  }


  geocodeAddress(address:string,type_sport:string) {
    this.geocoder.geocode({'address': address}, (results, status) => {
          if (status === 'OK') {
            let marker = {
              lat:results[0].geometry.location.lat(),
              lng:results[0].geometry.location.lng(),
              sport_type:type_sport
            };
            this.markers.push(marker);

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
    });
  }

}
