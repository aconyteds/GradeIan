import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Class, Credential } from '../interfaces';
import { ClassModel } from "../components/class/classModel";
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
  // Get all of the students for a given class
  // Get all of the assignments for a given class

}
