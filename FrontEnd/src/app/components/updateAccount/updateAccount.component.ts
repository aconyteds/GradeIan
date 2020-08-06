import { Component, OnInit } from '@angular/core';
import { NgForm, PatternValidator, EmailValidator } from "@angular/forms";
import { Router } from "@angular/router";
import { UpdateUserModel } from "./updateAccount.models";
import { UpdateAccountService } from "./updateAccount.service";

import { SecurityQuestion } from "../../interfaces";

@Component({
  selector: 'app-update-account',
  styles: [`
      .ng-valid[required], .ng-valid.required  {
        border-left: 5px solid #42A948; /* green */
      }
      .ng-invalid:not(form)  {
        border-left: 5px solid #a94442; /* red */
      }
    `],
  templateUrl: "./updateAccount.template.html"
})

export class UpdateAccountComponent implements OnInit {
  public user!: UpdateUserModel;
  public userId!: number;
  public userName!: string;
  public emailInUse = false;
  public questions: SecurityQuestion[] = [];
  public accountDetailsValid = false;
  public updateState: string;
  constructor(
    private updateAccountService: UpdateAccountService,
    private router: Router
  ) {
  }

  public ngOnInit() {
    this.getSecurityQuestions();
    this.getUserDetails();
  }

  public getSecurityQuestions(): void {
    this.updateAccountService.getSecurityQuestions()
      .subscribe((response) => this.questions = response);
  }

  public getUserDetails(): void {
    this.updateAccountService.getAccountDetails()
      .subscribe((response: any) => {
        if (!!response.userId) {
          this.userId = parseInt(response.userId, 10);
          this.userName = response.userName;
          this.user = new UpdateUserModel(
            response.firstName,
            response.lastName,
            response.email,
            response.securityQuestion,
            ""
          );
        } else {
          this.user = null;
        }
      });
  }

  public updateUserAccount() {
    this.updateAccountService.updateUserAccount(this.user)
      .subscribe((response: any) => {
        if (response.response === "1") {
          // Success
          this.updateState = "success";
        } else {
          this.updateState = "failure";
        }
      });
  }

  public checkEmail(): void {
    this.updateAccountService.checkEmail(this.user.email, this.userId)
      .subscribe((response) => this.emailInUse = !!parseInt(response.response, 10));
  }
}
