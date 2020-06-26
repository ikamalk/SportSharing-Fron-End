import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  tab:String = "board";
  account:Account;
  constructor(private sharedService:SharedService,
    private serviceAccount:AccountService,
    private router:Router) {
    this.account = JSON.parse(localStorage.getItem("account"));
    this.sharedService.getNewTab().subscribe((tab)=>{
      this.tab = tab;
    });
  }

  ngOnInit(): void {

  }

  logout(){
    this.serviceAccount.removeAccountSession();
    this.router.navigate(['/']);
  }

}
