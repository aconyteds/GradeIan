import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecoverAccountService } from "./recoverAccount.services";
import { RecoverAccount, RecoverAccountModel } from "./recoverAccount.models";

import { PasswordService } from "../../utilities/passwords";

@Component({
  selector: 'app-recover-account',
  styles: [
    `
    .recover-account-container{
      position:fixed;
      left:0;
      right:0;
      top:0;
      bottom:0;
      z-index:999;
      background:#FFF;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    `
  ],
  templateUrl: "./recoverAccount.template.html"
})
// TODO:: Add a check to see if the user has a valid token, if so route to the home page instead
export class RecoverAccountComponent {
  public user: RecoverAccount = new RecoverAccountModel(null, "", "", null, "", "");
  public confirmPassword = "";
  public passwordStrength = 0;
  private passwordService: PasswordService = new PasswordService();
  public recovered = false;
  public userInputProvided = false;
  public userIsReadyToRecover = false;
  public foundAccount = true;
  public correctAnswer = true;
  constructor(
    public recoverAccountService: RecoverAccountService,
    public router: Router
  ) {}

  public getSecurityQuestion() {
    if (this.userInputProvided) {
      this.recoverAccountService.getSecurityQuestion(this.user.userName, this.user.userEmail)
        .subscribe((response: any) => {
          this.foundAccount = response.response === "0" ? false : true;
          if (response.response === true) {
            this.user.securityQuestion = response.question;
            this.user.userId = parseInt(response.userId, 10);
            this.user.userName = response.userName;
          }
        });
    }
  }

  public recoverUserAccount() {
    if (!!this.userIsReadyToRecover) {
      const accountRecovery = new RecoverAccountModel(
        this.user.userId,
        null,
        null,
        null,
        this.user.securityAnswer,
        this.passwordService.obfuscatePassword(this.user.password));
      this.recoverAccountService.recoverAccount(accountRecovery)
        .subscribe((response) => {
          if (response.response) {
            this.correctAnswer = response.response === "0" ? false : true;
            if (!!this.correctAnswer) {
              this.recovered = true;
            }
          } else {
            // There was a problem with the input sent
          }
        }
      );
    }
  }

  public readyToRecover() {
    this.userIsReadyToRecover = (!!this.user.userId && this.user.securityAnswer !== "")
    && (this.user.password === this.confirmPassword && this.confirmPassword !== "");
  }

  public providedUserNameorEmail() {
    this.userInputProvided = this.user.userName !== "" || this.user.userEmail !== "";
  }

  public checkPasswordStrength(password: string): void {
    this.passwordStrength = this.passwordService.checkPasswordStrength(password);
  }

  public login() {
    this.router.navigate(["/login"]);
  }
}
