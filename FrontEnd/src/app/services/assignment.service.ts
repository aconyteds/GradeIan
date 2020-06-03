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
  // Create a new account
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
}
