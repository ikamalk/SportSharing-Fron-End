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
  isOpened:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.onResize(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  if(this.innerWidth < 992) {
    this.modeMenu = "over";
    this.isOpened = false;
  } else {
    this.modeMenu = "side";
    this.isOpened = true;
  }
}




  toggle(){
    this.sidenav.toggle();
  }

}
