import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AvatarModule } from 'ngx-avatar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { MenuComponent } from './components/dashboard-container/menu/menu.component';
import { ContentComponent } from './components/dashboard-container/content/content.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './components/dashboard-container/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyRequestComponent } from './components/my-request/my-request.component';
export function tokenGetter() {
  console.log("token !!!");
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardContainerComponent,
    MenuComponent,
    ContentComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    MyRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonToggleModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,

    AvatarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAJnZ3a5krUFvldtEnnNE6RUYRKD1-AISo'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:1212"],
        blacklistedRoutes: ["http://localhost:1212/register","http://localhost:1212/authenticate"],
      },
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
