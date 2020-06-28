import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  opened: boolean = true;
  @ViewChild("sidenav") sidenav:MatSidenav;
  public innerWidth: any;
  modeMenu:string = "side";
  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  if(this.innerWidth < 992) {
    this.modeMenu = "over";
    this.sidenav.close();
  } else {
    this.modeMenu = "side";
    this.sidenav.open();

  }
  
}

  toggle(){
    this.sidenav.toggle();
  }

}
