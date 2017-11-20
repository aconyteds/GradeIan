import { NgModule }      from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {CreateAccount} from "../components/createAccount/createAccount.component";

const appRoutes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component: CreateAccount
  },{
    path:"register",
    component: CreateAccount
  }
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})

export class RouteModule{}
