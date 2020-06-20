import { AssignmentUrls } from "../config";
import { AssignmentItem, AssignmentGroup, Response } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from "./authentication";
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AssignmentService extends Authentication {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private urls: AssignmentUrls = new AssignmentUrls();
  constructor(public http: HttpClient) {
    super(http);
  }
  public getAssignments(classIdentifier: number): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      classId: classIdentifier
    };

    return this.http.post<any>(this.urls.getAssignments, JSON.stringify(data))
                    .pipe(catchError(this.authenticateValidation('getAssignments')));
  }

  public getAssignmentItems(groupIdentifier: number): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      groupId: groupIdentifier
    };

    return this.http.post<any>(this.urls.getAssignmentItems, JSON.stringify(data))
                    .pipe(catchError(this.authenticateValidation('getAssignmentItems')));
  }

  // Create a new assignment Group with Items
  public createAssignment(assignmentData: AssignmentGroup[], assignmentItems: AssignmentItem [][]): Observable<Response> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      assignments: assignmentData.map((item, indx) => {
        return {
          assignment: item,
          assignmentItems: assignmentItems[indx]
        };
      })
    };

    return this.http.post<any>(this.urls.createAssignment, JSON.stringify(data))
                    .pipe(catchError(this.authenticateValidation('createAssignment')));
  }

  public createAssignmentItems(assignmentItems: AssignmentItem[]): Observable<Response> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      assignments: assignmentItems
    };
    return this.http.post<any>(this.urls.createAssignmentItem, JSON.stringify(data))
                    .pipe(catchError(this.authenticateValidation('createAssignmentItem')));
  }

  public updateAssignmentGroups(assignmentData: AssignmentGroup[]): Observable<Response> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      assignments: assignmentData
    };
    return this.http.post<any>(this.urls.updateAssignmentGroup, JSON.stringify(data))
                    .pipe(catchError(this.authenticateValidation('updateAssignmentGroup')));
  }

  public updateAssignmentItems(assignmentData: AssignmentItem[]): Observable<Response> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      assignments: assignmentData
    };
    return this.http.post<any>(this.urls.updateAssignmentItem, JSON.stringify(data))
                    .pipe(catchError(this.authenticateValidation('updateAssignmentItem')));
  }

  public deleteAssignmentGroups(assignmentGroupIds: number[]): Observable<Response> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      groupIds: assignmentGroupIds
    };

    return this.http.post<any>(this.urls.deleteAssignmentGroup, JSON.stringify(data))
                    .pipe(catchError(this.authenticateValidation('deleteAssignmentGroup')));
  }

  public deleteAssignmentItems(assignmentItemIds: number[]): Observable<Response> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      assignmentIds: assignmentItemIds
    };

    return this.http.post<any>(this.urls.deleteAssignmentItem, JSON.stringify(data))
                    .pipe(catchError(this.authenticateValidation('deleteAssignmentItem')));
  }
}
