import { Component } from '@angular/core';
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

export class LoginForm {
  public credentials: Login;
  private userName = "";
  private password = "";
  private token: string;
  public response = "success";
  private passwordService: PasswordService = new PasswordService();
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    // we want to get any stored credentials
    this.getCredentials();
    // Create a login model using stored credentials (if available)
    this.credentials = new LoginModel(this.userName, this.password);
  }

  public getCredentials(): void {
    let type = "";
    if (window.sessionStorage.getItem("userName")) {
      type = "sessionStorage";
    } else if (window.localStorage.getItem("userName")) {
      type = "localStorage";
    } else {
      return;
    }

    this.userName = window[type].getItem("userName");
    this.password = window[type].getItem("password");
    this.token = window[type].getItem("token");
  }

  public login(): void {
    console.log("login");
    window.sessionStorage.setItem("token", null);
    // Call the login service
    if (!this.credentials.userName && !this.credentials.password) { return; }
    // This is where we obfuscate the password
    this.accountService.login({
      userName: this.credentials.userName,
      password: this.passwordService.obfuscatePassword(this.credentials.password)
    })
      .subscribe((response) => {
        const token: string = response.token;
        // Token will either come back with a valid token, or a number signifying the error code
        if (response.token.search(/[a-zA-Z]/) > -1) {
          // Successful login, yay!
          // Store un and pw for subsequent logins during the users session,
          // later they can provide the option to remember through subsequent logins
          window.sessionStorage.setItem("userName", this.credentials.userName);
          window.sessionStorage.setItem("password", this.credentials.password);
          // Store the Token for credentials used for transactions to the server
          window.sessionStorage.setItem("token", token);
          if (this.router.url === "/") {
            // Initial login we want to route the user to the home page
            this.router.navigate([`/home`]);
          }
        } else {
          // Reset the password back to the original so the form looks right
          if (response.token === "-2") {
            this.response = "locked";
          } else {
            this.response = "failed";
          }
        }
      });
  }

  public register(): void {
    this.router.navigate([`/newAccount`]);
  }
}
