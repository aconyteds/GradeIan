import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

//Bootstraped Components
import {ContentComponent} from "../components/content.component";

//services
import {AccountService} from "../services/account.service";
import {ClassesService} from "../services/classes.service";

//
// //Route Components
import {RouteModule} from "./router.module";
import {CreateAccount} from "../components/createAccount/createAccount.component";
import {CreateClass} from "../components/class/createClass.component";
import {LoginForm} from "../components/login/login.component";
import {MainLogin} from "../components/login/mainLogin.component";
import {Home} from "../components/home.component";

//Directives

@NgModule({
  imports:      [
    BrowserModule,
    RouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    CreateAccount,
    CreateClass,
    ContentComponent,
    MainLogin,
    LoginForm,
    Home
  ],
  providers:[
    AccountService,
    ClassesService
  ],
  bootstrap:    [
    // TitleComponent,
    // MenuComponent,
    // SearchComponent,
    // AvatarComponent,
    ContentComponent
  ]
})

export class AppModule {
}
