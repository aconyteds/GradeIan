import { AccountUrls } from "../../config";
import {  Response, SecurityQuestion } from '../../interfaces';
import { UpdateUserModel, UpdatePasswordModel } from "./updateAccount.models";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from "../../services/authentication";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UpdateAccountService extends Authentication {
  private urls: AccountUrls = new AccountUrls();
  constructor(public http: HttpClient) {
    super(http);
  }
  // Checks if an email is in user or not
  public checkEmail(email: string, userId: number): Observable<Response> {
    return this.http.get<Response>(this.urls.checkEmail + `?email=${email}` + `&userId=${userId}`);
  }
  // Gets the security questions from the database
  public getSecurityQuestions(): Observable<SecurityQuestion[]> {
    return this.http.get<SecurityQuestion[]>(this.urls.getSecurityQuestions);
  }
  public getUserDetails(): Observable<any> {
    return this.http.post<any>(this.urls.getUserDetails, JSON.stringify({ "token": window.sessionStorage.getItem("token") }))
      .pipe(catchError(this.authenticateValidation('getUserDetails')));
  }
  public updateUserAccount(updatedUserObject: UpdateUserModel): Observable<any> {
    updatedUserObject.token = window.sessionStorage.getItem("token");
    return this.http.post<Response>(this.urls.updateUserAccount, JSON.stringify(updatedUserObject))
      .pipe(catchError(this.authenticateValidation('updateUserAccount')));
  }
}
