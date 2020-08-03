import { AccountUrls } from "../../config";
import { Response } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from "../../services/authentication";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AdminService extends Authentication {
  private urls: AccountUrls = new AccountUrls();
  constructor(public http: HttpClient) {
    super(http);
  }
  public getUserDetails(): Observable<any> {
    return this.http.post<any>(this.urls.getUserDetails, JSON.stringify({ "token": window.sessionStorage.getItem("token") }))
      .pipe(catchError(this.authenticateValidation('admin-getUserDetails')));
  }
}
