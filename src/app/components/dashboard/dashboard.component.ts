import { Component, OnInit, NgZone } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Account } from 'src/app/models/Account';
import { MapsAPILoader } from '@agm/core';
import { Marker } from 'src/app/models/Marker';
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

  constructor(private requestService:RequestService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.account = JSON.parse(localStorage.getItem("account"));
    this.setCurrentLocation();
    this.getAllRequest();
  }

  ngOnInit(): void {

  }

  generateMarker(){
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder;
      this.requests.forEach(request => {
        this.geocodeAddress(request['address'],request['sport_type']);
      });
   });

  }

  getAllRequest(){
    this.requestService.getAllRequest().then(requests=>{
      this.requests = requests;
      console.log(this.requests);
      this.generateMarker();
      
    })
  }


  setCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 10;
      });
  }

  stars(val) {
    const starPercentage = (val / 5) * 100;
    const starPercentageRounded = `${(starPercentage / 10) * 10}%`;
    return starPercentageRounded;

  }


  geocodeAddress(address:string,type_sport:string) {
    this.geocoder.geocode({'address': address}, (results, status) => {
          if (status === 'OK') {
            console.log(results[0].geometry.location.lat()+" "+results[0].geometry.location.lng());
            let marker = {
              lat:parseInt(results[0].geometry.location.lat()),
              lng:parseInt(results[0].geometry.location.lng()),
              sport_type:type_sport
            };
            this.markers.push(marker);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
    });
  }

}
