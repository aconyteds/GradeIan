import { AccountUrls } from "../../config";
import { Response } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from "../../services/authentication";
import { RecoverAccount } from "./recoverAccount.models";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class RecoverAccountService extends Authentication {
  private urls: AccountUrls = new AccountUrls();
  constructor(public http: HttpClient) {
    super(http);
  }

  public getSecurityQuestion(userNameInput: string, userEmailInput: string) {
    const user = {
      userName: userNameInput,
      userEmail: userEmailInput
    };
    return this.http.post<Response>(this.urls.getSecurityQuestion, JSON.stringify(user));
  }

  public recoverAccount(recoveryDetails: RecoverAccount) {
    return this.http.post<Response>(this.urls.recoverAccount, JSON.stringify(recoveryDetails));
  }
}
