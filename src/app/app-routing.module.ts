import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';


const routes: Routes = [
  {
    component:LoginComponent,
    path:"",
  },
  {
    component:DashboardContainerComponent,
    path:"dashboard",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
