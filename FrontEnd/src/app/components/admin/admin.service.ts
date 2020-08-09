import { AccountUrls, GroupsUrls } from "../../config";
import { Response } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from "../../services/authentication";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AdminService extends Authentication {
  private accountUrls: AccountUrls = new AccountUrls();
  private groupsUrls: GroupsUrls = new GroupsUrls();
  constructor(public http: HttpClient) {
    super(http);
  }
  public getUserDetails(): Observable<any> {
    return this.http.post<any>(this.accountUrls.getUserDetails, JSON.stringify({ "token": window.sessionStorage.getItem("token") }))
      .pipe(catchError(this.authenticateValidation('admin-getUserDetails')));
  }

  public getGroupsDetails(): Observable<any> {
    return this.http.post<any>(this.groupsUrls.getGroupsDetails, JSON.stringify({ "token": window.sessionStorage.getItem("token") }))
      .pipe(catchError(this.authenticateValidation('admin-getUserDetails')));
  }

  public getGroupLicenseDetails(groupIdentifier: number): Observable<any> {
    const licenseRequest = {
      token: window.sessionStorage.getItem("token"),
      groupId: groupIdentifier
    };
    return this.http.post<any>(this.groupsUrls.getGroupLicenseDetails, JSON.stringify(licenseRequest))
      .pipe(catchError(this.authenticateValidation('admin-getGroupsLicenseDetails')));
  }

  public getAccessLevels(): Observable<any> {
    return this.http.post<any>(this.groupsUrls.getAccessLevels, JSON.stringify({ "token": window.sessionStorage.getItem("token") }))
      .pipe(catchError(this.authenticateValidation('admin-getAccessLevels')));
  }

  public createLicense(accessLevelId: number, groupIdentifier: number): Observable<any> {
    const createLicenseRequest = {
      token: window.sessionStorage.getItem("token"),
      groupId: groupIdentifier,
      accessLevel: accessLevelId
    };
    return this.http.post<any>(this.groupsUrls.createLicense, JSON.stringify(createLicenseRequest))
      .pipe(catchError(this.authenticateValidation('admin-createLicense')));
  }
}
