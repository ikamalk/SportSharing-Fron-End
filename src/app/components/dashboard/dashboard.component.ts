import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom:number;
  constructor() {
    this.setCurrentLocation();

  }

  ngOnInit(): void {
  }


  setCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 10;
      });
  }

}
