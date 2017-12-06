import { NgModule }      from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {CreateAccount} from "../components/createAccount/createAccount.component";
import {CreateClass} from "../components/class/createClass.component";
import {LoginForm} from "../components/login/login.component";
import {MainLogin} from "../components/login/mainLogin.component";
import {Home} from "../components/home.component";

const appRoutes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component: MainLogin
  },{
    path:"home",
    pathMatch:"full",
    component:Home
  },{
    path:"newAccount",
    pathMatch:"full",
    component: CreateAccount
  },{
    path:"newClass",
    pathMatch:"full",
    component:CreateClass
  },{
    path:"**",
    redirectTo:""
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
