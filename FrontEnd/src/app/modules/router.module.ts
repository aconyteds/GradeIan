import { NgModule }      from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {CreateAccount} from "../components/createAccount/createAccount.component";
import {CreateClass} from "../components/class/createClass.component";
import {CreateStudents} from "../components/students/createStudent.component";
import {LoginForm} from "../components/login/login.component";
import {MainLogin} from "../components/login/mainLogin.component";
import {UserDashboard} from "../components/dashboard.component";

const appRoutes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component: MainLogin
  },{
    path:"home",
    pathMatch:"full",
    component:UserDashboard
  },{
    path:"newAccount",
    pathMatch:"full",
    component: CreateAccount
  },{
    path:"newClass",
    pathMatch:"full",
    component:CreateClass
  },{
    path:"newStudent",
    pathMatch:"full",
    component:CreateStudents
  },{
    path:"class/:id",
    pathMatch:"full",
    redirectTo:""
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
