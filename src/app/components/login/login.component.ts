import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private service:ServiceService,public formBuilder: FormBuilder,private serviceWorker:ServiceWorker) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  login(){
    this.service.login(this.loginForm.value.username,this.loginForm.value.password).then((resp)=>{
      console.log(resp);
      localStorage.setItem("token",resp["jwt"]);
     console.log(localStorage.getItem("token"));
        this.service.hello();
    })
    
  }

}
