import { GroupsUrls } from "../../config";
import { Response } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from "../../services/authentication";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class GroupsService extends Authentication {
  private urls: GroupsUrls = new GroupsUrls();
  constructor(public http: HttpClient) {
    super(http);
  }

  public getGroupUsers(groupIdentifier?: number): Observable<any> {
    const groupData = {
      token: window.sessionStorage.getItem("token"),
      groupId: groupIdentifier
    };
    return this.http.post<any>(this.urls.getGroupUsers, JSON.stringify(groupData))
      .pipe(catchError(this.authenticateValidation('getGroupUsers')));
  }

  public unlockAccount(accountIdentifier: number) {
    const unlockRequest = {
      token: window.sessionStorage.getItem("token"),
      accountId: accountIdentifier
    };
    return this.http.post<any>(this.urls.unlockAccount, JSON.stringify(unlockRequest))
      .pipe(catchError(this.authenticateValidation('unlockAccount')));
  }
}
