import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

//Bootstraped Components
import {ContentComponent} from "../components/content.component";

//services
import {AccountService} from "../services/account.service";

//Test Data imports
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
// import {UserData} from "../test/data/users";
//
// //Route Components
import {RouteModule} from "./router.module";
import {CreateAccount} from "../components/createAccount/createAccount.component";
import {LoginForm} from "../components/login/login.component";
import {MainLogin} from "../components/login/mainLogin.component";
import {Home} from "../components/home.component";
// import {NewUserForm} from "../components/NewUser/newUser.component";
// import {ViewUser} from "../components/ViewUser/viewUser.component";
// import {Directory} from "../components/Directory/directory.component";

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
    ContentComponent,
    MainLogin,
    LoginForm,
    Home
  ],
  providers:[
    AccountService
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
