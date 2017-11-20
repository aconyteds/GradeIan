import { Component } from '@angular/core';
import {NgForm, PatternValidator, EmailValidator} from "@angular/forms";
import {Router} from "@angular/router";
import {UserModel} from "./userModel";

import {AccountService} from "../../services/account.service";
import {User} from "../../interfaces";
import {SecurityQuestions} from "../securityQuestion/securityQuestion.component";

import {PasswordCheckService} from "../../utilities/password-strength";


@Component({
  selector: 'create-account',
  styles:[`
      .ng-valid[required], .ng-valid.required  {
        border-left: 5px solid #42A948; /* green */
      }
      .ng-invalid:not(form)  {
        border-left: 5px solid #a94442; /* red */
      }
      .password-strength{
        margin-top:5px;
        margin-left:15px;
      }
    `],
  templateUrl: "./createAccount.template.html",
  host:{
    'class':"col col-md-8 offset-md-2  col-lg-6 offset-lg-3 card"
  }
})

export class CreateAccount  {
  private user:User;
  private invalid:boolean = true;
  private emailInUse:boolean = false;
  private userNameInUse:boolean = false;
  private confirmPassword:string = "";
  private passwordStrength:number = 0;
  private passwordService:PasswordCheckService = new PasswordCheckService();
  constructor(
    private accountService:AccountService,
    private router:Router
  ){
    this.user = new UserModel("", "", "", 1, "", "", "");
  }

  onSubmit(user:User):void{
    //Not everything is filled out yet
    if(!user.firstName || !user.lastName || !user.email || !user.userName || !user.email || this.emailInUse || this.userNameInUse){return;}

    //Before we send the Password, we need to obfuscate it, this is a great place to do that

    //Call the user creation service method
    this.accountService.create(this.user)
      .subscribe(function(response){
        //{newUserID: "4"}
        //Need to route to login
        console.log(response)
      });
  }

  checkEmail(email:string):void{
    this.accountService.checkEmail(email)
      .subscribe(response => this.emailInUse =  !!parseInt(response["response"]));
  }

  checkUserName(userName:string):void{
    this.accountService.checkUserName(userName)
      .subscribe(response=>this.userNameInUse = !!parseInt(response["response"]));
  }

  checkPasswordStrength(password:string):void{
    this.passwordStrength = this.passwordService.checkPasswordStrength(password);
  }
 }
