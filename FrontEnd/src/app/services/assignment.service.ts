import { AssignmentUrls } from "../config";
import { AssignmentItem, AssignmentGroup, Response } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from "./authentication";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AssignmentService extends Authentication {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private urls: AssignmentUrls = new AssignmentUrls();
  constructor(public http: HttpClient) {
    super(http);
  }
  // Create a new account
  public createAssignment(assignment: AssignmentGroup): Observable<Response> {
    return this.http.post<any>(this.urls.createAssignment, JSON.stringify(assignment))
                    .pipe(catchError(this.authenticateValidation('createAssignment')));
  }

  public createAssignmentItem(assignmentItem: AssignmentItem): Observable<Response> {
    return this.http.post<any>(this.urls.createAssignmentItem, JSON.stringify(assignmentItem))
                    .pipe(catchError(this.authenticateValidation('createAssignmentItem')));
  }
}
