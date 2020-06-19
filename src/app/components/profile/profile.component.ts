import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Account } from 'src/app/models/Account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  accountForm: FormGroup;
  account:Account;

  constructor(public formBuilder: FormBuilder,private accountService:AccountService) {
    this.account = JSON.parse(localStorage.getItem("account"));
    this.accountForm = this.formBuilder.group({
      id: [this.account.id],
      username: [this.account.username, Validators.required],
      password: [this.account.password, Validators.required],
      firstname: [this.account.firstname, Validators.required],
      lastname: [this.account.lastname, Validators.required],
      birthday: [this.account.birthday, Validators.required],
      phoneNumber: [
        this.account.phoneNumber,
        Validators.pattern(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/),
      ],
      city: [this.account.city, Validators.required],
      state: [this.account.state, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  update(){
    console.log(this.accountForm.value);
    this.accountService.updateAccount(this.accountForm.value).then((resp)=>{
      console.log(resp);
      localStorage.setItem("account",JSON.stringify(resp));
    })
  }

}
