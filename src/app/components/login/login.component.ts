import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
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

  constructor(private service:ServiceService,public formBuilder: FormBuilder,private router:Router,
    private accountService:AccountService, private changeDetector : ChangeDetectorRef) {
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
      birthday: ["", Validators.required],
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
    }, 2100);

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
     this.accountService.getAccountSession(this.loginForm.value.username);
        this.successLogin();
        setTimeout(() => {
          this.router.navigateByUrl("dashboard/(my:board)");
        }, 1000);
    }).catch(error=>{

    });
  }

  register(){
    this.accountService.addAccount(this.registerForm.value).then((res)=>{
      console.log(
        'ok'
      );
      this.MsgRegister();
      this.isRegisterSuccess = true;
      this.isLogin = true;
    }).catch(error=>{
      console.log(
        error
      );
    })
  }


  toggle() {
    this.isLogin = !this.isLogin;
  }


    // when credentials are verifired, this fucntion is called and produces the success message.
    successLogin() {
      this.isWelcome = false;
      this.isLoginSuccess = true;
      this.isRegisterSuccess = false;
      this.isLoginFailure = false;
    }
    // when credentials are not verified, this fucntion is called and produces the failure message.
    failureLogin() {
      this.isWelcome = false;
      this.isLoginSuccess = false;
      this.isRegisterSuccess = false;
      this.isLoginFailure = true;
    }
    // this fucntion is called when registration is successful.
    MsgRegister() {
      this.isWelcome = false;
      this.isLoginSuccess = false;
      this.isRegisterSuccess = true;
      this.isLoginFailure = false;
      this.changeDetector.detectChanges();
    }

}
