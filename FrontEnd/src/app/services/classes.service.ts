import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Class, Credential, AssignmentItem, Grade, Response } from '../interfaces';
import { ClassModel, ClassDetailModel } from "../components/class/classModel";
import { ClassesUrls } from "../config";
import { Authentication } from "./authentication";

@Injectable()
export class ClassesService extends Authentication {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private urls: ClassesUrls = new ClassesUrls();
  constructor(public http: HttpClient) {
    super(http);
  }
  // Creates a new Class
  public createClass(classData: ClassModel): Observable<any> {
    return this.http.post<any>(this.urls.createClass, JSON.stringify(classData))
      .pipe(catchError(this.authenticateValidation('createClass')));
  }
  // Gets all classes for the current user token
  public getClasses(): Observable<any> {
    return this.http.get<any>(this.urls.getClass + "?token=" + window.sessionStorage.getItem("token"))
      .pipe(catchError(this.authenticateValidation('getClasses')));
  }
  // Get the details for a specific class
  public getClass(classIdentifier: number): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      classId: classIdentifier
    };

    return this.http.post<ClassDetailModel>(this.urls.getClass, JSON.stringify(data))
      .pipe(catchError(this.authenticateValidation('getClass')));
  }
  public getAssignmentGrades(assignmentItems: AssignmentItem[]): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      assignments: assignmentItems
    };
    return this.http.post<Grade []>(this.urls.getAssignmentGrades, JSON.stringify(data))
      .pipe(catchError(this.authenticateValidation('getAssignmentGrades')));
  }

  public saveGrade(newGrade: Grade): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      grade: newGrade
    };
    return this.http.post<Response>(this.urls.setGrade, JSON.stringify(data))
      .pipe(catchError(this.authenticateValidation('saveGrade')));
  }

  public saveGrades(newGrades: Grade[]): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      grades: newGrades
    };
    return this.http.post<Response>(this.urls.setGrade, JSON.stringify(data))
      .pipe(catchError(this.authenticateValidation('saveGrades')));
  }

  public updateClass(classData: ClassModel): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      classDetails: classData
    };

    return this.http.post<Response>(this.urls.updateClass, JSON.stringify(data))
      .pipe(catchError(this.authenticateValidation('updateClass')));
  }
}
