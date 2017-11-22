import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginModel} from "./login.model";

import {AccountService} from "../../services/account.service";
import {Login} from "../../interfaces";

///<reference path="../../../utilities/typings/node-forge.d.ts" />
import forge = require("node-forge");


@Component({
  selector: 'login',
  templateUrl: "./login.template.html"
})

export class LoginForm {
  private credentials:Login;
  private userName:string ="";
  private password:string = "";
  private token:string;
  private response:string = "success";
  constructor(
    private accountService:AccountService,
    private router:Router
  ){
    //we want to get any stored credentials
    this.getCredentials();
    //Create a login model using stored credentials (if available)
    this.credentials = new LoginModel(this.userName, this.password);
  }

  getCredentials():void{
    var type:string = "";
    if(window.sessionStorage.getItem("userName")){
      type = "sessionStorage";
    }
    else if(window.localStorage.getItem("userName")){
      type="localStorage";
    }
    else{
      return;
    }

    this.userName = window[type].getItem("userName");
    this.password = window[type].getItem("password");
    this.token = window[type].getItem("token");
  }

  login():void{
    //Call the login service
    if(!this.credentials.userName && !this.credentials.password){return;}
    //This is where we obfuscate the password
    //Before we send the Password, we need to obfuscate it
    var tempPW = this.credentials.password;
    //Create a sha256 object
    var encryptPW = forge.md.sha256.create();
    //Set the sha256 object to the users password
    encryptPW.update(this.credentials.password);
    //Set the password being sent to the server to a sha256 Hex string
    this.credentials.password = encryptPW.digest().toHex();
    //call obfuscate code
    this.accountService.login(this.credentials)
      .subscribe(response=>{
        var userId:string = response.userId;
        var token:string = response.token;
        if(parseInt(userId)>0){
          //Successful login, yay!
          // window.sessionStorage.setItem("userName", this.credentials.userName);
          // window.sessionStorage.setItem("password", this.credentials.password);
          //Store the userId and Token for credentials used for transactions to the server
          window.sessionStorage.setItem("userId", userId.toString());
          window.sessionStorage.setItem("token", token);
          if(this.router.url == "/"){
            //Initial login we want to route the user to the home page
            this.router.navigate([`/home`]);
          }
        }
        else{
          //Reset the password back to the original
          this.credentials.password = tempPW;
          if(response.userId =="-2"){
            this.response = "locked";
          }
          else {
            this.response = "failed";
          }
        }
      });
  }

  register():void{

  }
};
