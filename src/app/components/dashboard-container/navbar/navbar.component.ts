import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  tab:String = "board";
  constructor(private sharedService:SharedService) {
    this.sharedService.getNewTab().subscribe((tab)=>{
      this.tab = tab;
      console.log(this.tab);
    });
  }

  ngOnInit(): void {

  }

}
