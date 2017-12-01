import { Component, OnInit } from '@angular/core';
import {NgForm, PatternValidator, EmailValidator} from "@angular/forms";
import {Router} from "@angular/router";
import {UserModel} from "./userModel";

import {AccountService} from "../../services/account.service";
import {User, SecurityQuestion, Login} from "../../interfaces";

import {PasswordService} from "../../utilities/passwords";


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
  templateUrl: "./createAccount.template.html"
})

export class CreateAccount implements OnInit {
  private user:User;
  private invalid:boolean = true;
  private emailInUse:boolean = false;
  private userNameInUse:boolean = false;
  private confirmPassword:string = "";
  private passwordStrength:number = 0;
  private passwordService:PasswordService = new PasswordService();
  private questions:SecurityQuestion[];
  constructor(
    private accountService:AccountService,
    private router:Router
  ){
    this.user = new UserModel("", "", "", 1, "", "", "");
  }

  ngOnInit(){
    this.getSecurityQuestions();
  }

  getSecurityQuestions(): void {
    this.accountService.getSecurityQuestions()
      .subscribe(response=>this.questions = response);
  }

  onSubmit(user:User):void{
    //Not everything is filled out yet
    if(!user.firstName || !user.lastName || !user.email || !user.userName || !user.email || this.emailInUse || this.userNameInUse){return;}

    //Enforce upper case on first characters of names
    user.firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.substr(1);
    user.lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.substr(1);

    //Before we send the Password, we need to obfuscate it
    var tempPW = user.password;
    user.password = this.passwordService.obfuscatePassword(user.password);
    this.accountService.create(user)
      .subscribe(response=>{
        //{newUserID: "4"}
        if(parseInt(response.newUserID)>0){
        //We want to log in for the user immediately because we're nice
          var credential:Login = {
            userName: user.userName,
            password: user.password
          };
          //Call the login service
          this.accountService.login(credential)
          .subscribe(response=>{
            //Store the session credentials for the user
            window.sessionStorage.setItem("token", response.token);
            //Go to the user's homepage :)
            this.router.navigate(["/home"]);
          });
        }
        else{
          //something went wrong, sorry gov'na
          //Reset the user's PW back to it's original state so they can re-submit correctly
          user.password=tempPW;
        }
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
