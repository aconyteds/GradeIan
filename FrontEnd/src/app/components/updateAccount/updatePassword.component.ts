import { Component, OnInit } from '@angular/core';
import { NgForm, PatternValidator, EmailValidator } from "@angular/forms";
import { Router } from "@angular/router";
import { UpdatePasswordModel } from "./updateAccount.models";
import { UpdateAccountService } from "./updateAccount.service";

import { PasswordService } from "../../utilities/passwords";

@Component({
  selector: 'app-update-password',
  styles: [`
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
  templateUrl: "./updatePassword.template.html"
})

export class UpdatePasswordComponent implements OnInit {
  public user!: UpdatePasswordModel;
  public userId!: number;
  public confirmPassword = "";
  public passwordStrength = 0;
  private passwordService: PasswordService = new PasswordService();
  public updateState: string;
  constructor(
    private updateAccountService: UpdateAccountService,
    private router: Router
  ) {
  }

  public ngOnInit() {
    this.getUserDetails();
  }

  public getUserDetails(): void {
    this.updateAccountService.getAccountDetails()
      .subscribe((response: any) => {
        if (!!response.userId) {
          this.user = new UpdatePasswordModel(
            parseInt(response.userId, 10),
            "",
            ""
          );
        } else {
          this.user = null;
        }
      });
  }

  public updateUserPassword() {
    if (this.user.newPassword !== ""  && this.user.password !== ""
    && this.user.newPassword === this.confirmPassword) {
      const userSubmission = new UpdatePasswordModel(
        this.user.userId,
        this.passwordService.obfuscatePassword(this.user.password),
        this.passwordService.obfuscatePassword(this.user.newPassword)
      );

      this.updateAccountService.updateUserPassword(userSubmission)
        .subscribe((response: any) => {
          if (response.response !== "0" && response.response !== "-1") {
            // Success
            this.updateState = "success";
            // Set the session credential so that if the token runs out the user can still login
            window.sessionStorage.setItem("loginCredential", userSubmission.newPassword);
            if (window.localStorage.getItem("autoLogin") === "true") {
              // User wants the app to remember them, set the local storage for later
              window.localStorage.setItem("loginCredential", userSubmission.newPassword);
            }
          } else if (response.response === "-1") {
            // Account locked out!
            this.updateState = "lockout";
            window.sessionStorage.setItem("token", null);
            window.sessionStorage.setItem("loginCredential", null);
            if (window.localStorage.getItem("autoLogin") === "true") {
              window.localStorage.setItem("autoLogin", "false");
              window.localStorage.setItem("loginCredential", null);
            }
            setTimeout(() => {
              this.router.navigate(["/login"]);
            }, 5000);
          } else {
            this.updateState = "failure";
          }
        });
    }
  }

  public checkPasswordStrength(password: string): void {
    this.passwordStrength = this.passwordService.checkPasswordStrength(password);
  }
}
