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
import { RecoverAccountService } from "../components/recoverAccount/recoverAccount.services";
import { UpdateAccountService } from "../components/updateAccount/updateAccount.service";
import { AdminService } from "../components/admin/admin.service";
//
// //Route Components
import { RouteModule } from "./router.module";
import { CreateAccount } from "../components/createAccount/createAccount.component";
import { CreateClass } from "../components/class/createClass.component";
import { ViewClass } from "../components/class/viewClass.component";
import { ClassGrades } from "../components/class/classGrades.component";
import { CreateStudents } from "../components/students/createStudent.component";
import { LoginForm } from "../components/login/login.component";
import { MainLogin } from "../components/login/mainLogin.component";
import { UserDashboard } from "../components/dashboard.component";
import { StudentsView } from "../components/students/studentsView.component";
import { AddStudent } from "../components/students/addStudent.component";
import { AssignmentView } from "../components/assignments/assignmentView.component";
import { AssignmentList } from "../components/assignments/assignmentList.component";
import { RecoverAccountComponent } from "../components/recoverAccount/recoverAccount.component";
import { UpdateAccountComponent } from "../components/updateAccount/updateAccount.component";
import { UpdatePasswordComponent } from "../components/updateAccount/updatePassword.component";
import { AdminComponent } from "../components/admin/admin.component";
import { AdminMenuComponent } from "../components/admin/adminMenu.component";

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
    ClassGrades,
    ContentComponent,
    MainLogin,
    LoginForm,
    UserDashboard,
    CreateStudents,
    AddStudent,
    StudentsView,
    AssignmentView,
    AssignmentList,
    RecoverAccountComponent,
    UpdateAccountComponent,
    UpdatePasswordComponent,
    AdminComponent,
    AdminMenuComponent
  ],
  providers: [
    AccountService,
    ClassesService,
    StudentService,
    AssignmentService,
    RecoverAccountService,
    UpdateAccountService,
    AdminService
  ],
  bootstrap: [
    // TitleComponent,
    // MenuComponent,
    // SearchComponent,
    // AvatarComponent,
    ContentComponent,
    AdminMenuComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
