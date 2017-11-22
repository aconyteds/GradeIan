import { NgModule }      from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {CreateAccount} from "../components/createAccount/createAccount.component";
import {LoginForm} from "../components/login/login.component";
import {MainLogin} from "../components/login/mainLogin.component";

const appRoutes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component: MainLogin
  },{
    path:"register",
    component: CreateAccount
  }
  // },{
  //   path:"login",
  //   component:LoginModal
  // }
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})

export class RouteModule{}
