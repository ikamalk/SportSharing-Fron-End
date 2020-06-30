import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $;
declare var Cleave;

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
  innerWidth:number;
  isMobile:boolean = false;
  @ViewChild("msgRegister",{static:false}) msgRegister:ElementRef;

  constructor(private service:ServiceService,public formBuilder: FormBuilder,private router:Router,
    private accountService:AccountService, private changeDetector : ChangeDetectorRef,private snackbar:MatSnackBar) {
      this.onResize(event)
      this.checkSession();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  /*  setTimeout(() => {
      this.isAnime = false;
    }, 1500);*/

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

  checkSession(){
    let account = JSON.parse(localStorage.getItem("account"));
    if(account) {
      this.accountService.getAccountSession(account.username);
      this.router.navigateByUrl("dashboard/(my:board)");
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      $('#slides').carousel({
        interval: 3000,
      }); 
    }, 2100);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  if(this.innerWidth < 992) {
    this.isMobile = true;
  } else {
    this.isMobile = false;
  }
}



  login(){
    if(this.loginForm.valid){
      this.service.login(this.loginForm.value.username,this.loginForm.value.password).then((resp)=>{
        localStorage.setItem("token",resp["jwt"]);
       this.accountService.getAccountSession(this.loginForm.value.username);
          this.successLogin();
          setTimeout(() => {
            this.router.navigateByUrl("dashboard/(my:board)");
          }, 1000);
      }).catch(error=>{
        this.failureLogin();
      });
    }

  }

  register(){
    if(this.registerForm.valid){

    this.accountService.addAccount(this.registerForm.value).then((res)=>{
      this.MsgRegister();
      this.isRegisterSuccess = true;
      this.isLogin = true;
    }).catch(error=>{
    })
  }
  }


  toggle() {
    this.isLogin = !this.isLogin;
    if (!this.isLogin) {
      setTimeout(() => {
        new Cleave('#phone', {
          phone: true,
          phoneRegionCode: 'us',
          delimiter: '-',
        });
      }, 1000);
    }
  }


    // when credentials are verifired, this fucntion is called and produces the success message.
    successLogin() {
      this.isWelcome = false;
      this.isLoginSuccess = true;
      this.isRegisterSuccess = false;
      this.isLoginFailure = false;
      if(this.isMobile) {
        this.snackbar.open("Welcome to pickup !", null, {
          duration: 2000,
        });
      }

    }
    // when credentials are not verified, this fucntion is called and produces the failure message.
    failureLogin() {
      this.isWelcome = false;
      this.isLoginSuccess = false;
      this.isRegisterSuccess = false;
      this.isLoginFailure = true;
      if(this.isMobile) {
        this.snackbar.open("Please verify your username and password!", null, {
          duration: 2000,
        });
      }
    }
    // this fucntion is called when registration is successful.
    MsgRegister() {
      this.isWelcome = false;
      this.isLoginSuccess = false;
      this.isRegisterSuccess = true;
      this.isLoginFailure = false;
      this.changeDetector.detectChanges();
      if(this.isMobile) {
        this.snackbar.open("You've registered successfully!, now you can login", null, {
          duration: 2000,
        });
      }
    }

}
