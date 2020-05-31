import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

// Bootstraped Components
import { ContentComponent } from "../components/content.component";

// services
import { AccountService } from "../services/account.service";
import { ClassesService } from "../services/classes.service";
import { StudentService } from "../services/students.service";
import { AssignmentService } from "../services/assignment.service";
//
// //Route Components
import { RouteModule } from "./router.module";
import { CreateAccount } from "../components/createAccount/createAccount.component";
import { CreateClass } from "../components/class/createClass.component";
import { ViewClass } from "../components/class/viewClass.component";
import { CreateStudents } from "../components/students/createStudent.component";
import { LoginForm } from "../components/login/login.component";
import { MainLogin } from "../components/login/mainLogin.component";
import { UserDashboard } from "../components/dashboard.component";
import { StudentsView } from "../components/students/studentsView.component";
import { AddStudent } from "../components/students/addStudent.component";
import { AssignmentView } from "../components/assignments/assignmentView.component";

// Directives

@NgModule({
  imports: [
    BrowserModule,
    RouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CreateAccount,
    CreateClass,
    ViewClass,
    ContentComponent,
    MainLogin,
    LoginForm,
    UserDashboard,
    CreateStudents,
    AddStudent,
    StudentsView,
    AssignmentView
  ],
  providers: [
    AccountService,
    ClassesService,
    StudentService,
    AssignmentService
  ],
  bootstrap: [
    // TitleComponent,
    // MenuComponent,
    // SearchComponent,
    // AvatarComponent,
    ContentComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
