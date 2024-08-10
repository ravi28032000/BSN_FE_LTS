import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RouteGuardGuard} from './route-guard.guard'
import { WithdrawComponent } from './withdraw/withdraw.component';
const routes: Routes = [
  {path:"",pathMatch:'full',redirectTo:'login'},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent,canActivate:[RouteGuardGuard]},
  {path:"withdraw",component:WithdrawComponent,canActivate:[RouteGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
