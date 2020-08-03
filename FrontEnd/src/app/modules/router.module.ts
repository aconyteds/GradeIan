import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { CreateAccount } from "../components/createAccount/createAccount.component";
import { CreateClass } from "../components/class/createClass.component";
// import { CreateStudents } from "../components/students/createStudent.component";
// import { LoginForm } from "../components/login/login.component";
import { MainLogin } from "../components/login/mainLogin.component";
import { UserDashboard } from "../components/dashboard.component";
// import { StudentsView } from "../components/students/studentsView.component";
import { ViewClass } from "../components/class/viewClass.component";
// import { AssignmentView } from "../components/assignments/assignmentView.component";
import { RecoverAccountComponent } from "../components/recoverAccount/recoverAccount.component";
import { UpdateAccountComponent } from "../components/updateAccount/updateAccount.component";
import { UpdatePasswordComponent } from "../components/updateAccount/updatePassword.component";

const appRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: MainLogin
  }, {
    path: "login",
    component: MainLogin
  }, {
    path: "recoverAccount",
    pathMatch: "full",
    component: RecoverAccountComponent
  }, {
    path: "home",
    pathMatch: "full",
    component: UserDashboard
  }, {
    path: "newAccount",
    pathMatch: "full",
    component: CreateAccount
  }, {
    path: "newClass",
    pathMatch: "full",
    component: CreateClass
  }, /* {
    path: "newStudent",
    pathMatch: "full",
    component: CreateStudents
  }, */ {
    path: "class/:id",
    pathMatch: "full",
    component: ViewClass
  }, {
    path: "editClass/:id",
    pathMatch: "full",
    component: CreateClass
  }, {
    path: "admin",
    children: [{
        path: "updateAccount",
        pathMatch: "full",
        component: UpdateAccountComponent
      }, {
        path: "updatePassword",
        pathMatch: "full",
        component: UpdatePasswordComponent
      }
    ]
  },
  /* {
    path: "addStudent",
    pathMatch: "full",
    component: StudentsView
  }, *//* {
    path: "assignment",
    component: AssignmentView
  }, */ {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class RouteModule { }
