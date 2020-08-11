import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginModel } from "./login.model";

import { AccountService } from "../../services/account.service";
import { Login } from "../../interfaces";

import { PasswordService } from "../../utilities/passwords";

@Component({
  selector: 'login',
  templateUrl: "./login.template.html"
})

export class LoginForm implements OnInit {
  public credentials: Login;
  private userName = "";
  private password = "";
  private encryptedPassword = "";
  public response = "success";
  private passwordService: PasswordService = new PasswordService();
  public rememberMe = false;
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {  }

  public ngOnInit() {
    // we want to get any stored credentials
    this.getCredentials();
    // Create a login model using stored credentials (if available)
    this.credentials = new LoginModel(this.userName, this.password);
    this.rememberMe = window.localStorage.getItem("autoLogin") === "true";
    if (this.encryptedPassword !== "" && this.rememberMe) {
      this.login({
        userName: this.userName,
        password: this.encryptedPassword
      });
    }
  }

  public getCredentials(): void {
    let type = "";
    if (window.localStorage.getItem("userName")) {
      type = "localStorage";
    } else if (window.sessionStorage.getItem("userName")) {
      type = "sessionStorage";
    } else {
      return;
    }

    this.userName = window[type].getItem("userName");
    this.encryptedPassword = window[type].getItem("loginCredential");
  }

  public login(loginObject?: any): void {
    // This is where we obfuscate the password
    if (!loginObject) {
      loginObject = {
        userName: this.credentials.userName,
        password: this.passwordService.obfuscatePassword(this.credentials.password)
      };
    }
    // Call the login service
    if (loginObject.userName === "" || loginObject.password === "") { return; }
    window.sessionStorage.setItem("token", null);
    this.accountService.login(loginObject)
      .subscribe((response) => {
        const token: string = response.token;
        // Token will either come back with a valid token, or a number signifying the error code
        if (response.token.search(/[a-zA-Z]/) > -1) {
          // Successful login, yay!
          // Store un and pw for subsequent logins during the users session,
          // later they can provide the option to remember through subsequent logins
          window.sessionStorage.setItem("userName", loginObject.userName);
          window.sessionStorage.setItem("loginCredential", loginObject.password);
          if (!!this.rememberMe) {
            window.localStorage.setItem("autoLogin", "true");
            window.localStorage.setItem("userName", loginObject.userName);
            window.localStorage.setItem("loginCredential", loginObject.password);
          } else {
            window.localStorage.setItem("autoLogin", "false");
          }
          // Store the Token for credentials used for transactions to the server
          window.sessionStorage.setItem("token", token);
          // Initial login we want to route the user to the home page
          this.router.navigate([`/home`]);
        } else {
          // Reset the password back to the original so the form looks right
          if (response.token === "-2") {
            this.response = "locked";
          } else {
            this.response = "failed";
          }
          window.localStorage.setItem("autoLogin", "false");
        }
      });
  }

  public register(): void {
    this.router.navigate([`/newAccount`]);
  }
}
