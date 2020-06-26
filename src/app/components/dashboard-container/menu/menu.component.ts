import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }


  sendTab(tab:string){
    this.sharedService.sendNewTab(tab);
  }

}
