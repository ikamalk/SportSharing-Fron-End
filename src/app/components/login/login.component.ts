import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //loginForm:FormGroup;
  //isLoading:boolean = false;
  isAnime: boolean = true;
  isLogin = true;
  registerForm: FormGroup;
  loginForm: FormGroup;
  username: string;
  password: string;
  isWelcome = true;
  isLoginSuccess = false;
  isRegisterSuccess = false;
  isLoginFailure = false;
  @ViewChild("msgRegister",{static:false}) msgRegister:ElementRef;

  constructor(private service:ServiceService,public formBuilder: FormBuilder,private router:Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    setTimeout(() => {
      this.isAnime = false;
    }, 1500);

    this.registerForm = this.formBuilder.group({
      userId: [0],
      username: ["", Validators.required],
      password: ["", Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.email],
      phoneNumber: [
        "",
        Validators.pattern(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/),
      ],
      city: ["", Validators.required],
      state: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      $('#slides').carousel({
        interval: 3000,
      });
    }, 3500);
  }

 /* login(){
    this.isLoading = true;
    this.service.login(this.loginForm.value.username,this.loginForm.value.password).then((resp)=>{
      console.log(resp);
      localStorage.setItem("token",resp["jwt"]);
     console.log(localStorage.getItem("token"));
        this.service.hello();
        setTimeout(() => {
          this.isLoading= false;
          this.router.navigate(["dashboard"]);
        }, 1000);
    }).catch(error=>{
      this.isLoading= false;
    });
    
  }*/

  login(){
    this.service.login(this.loginForm.value.username,this.loginForm.value.password).then((resp)=>{
      console.log(resp);
      localStorage.setItem("token",resp["jwt"]);
     console.log(localStorage.getItem("token"));
        this.service.hello();
        setTimeout(() => {
          this.router.navigate(["dashboard"]);
        }, 1000);
    }).catch(error=>{
    });
  }

  register(){

  }

  toggle() {
    this.isLogin = !this.isLogin;
  }

}
