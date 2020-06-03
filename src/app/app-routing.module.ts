import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyRequestComponent } from './components/my-request/my-request.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {
    component:LoginComponent,
    path:"",
  },
  {
    component:DashboardContainerComponent,
    path:"dashboard",
    children: [
      {
        path: 'board',
        component: DashboardComponent,
        outlet: 'my',
      },
      {
        path: 'request',
        component: MyRequestComponent,
        outlet: 'my',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        outlet: 'my',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
