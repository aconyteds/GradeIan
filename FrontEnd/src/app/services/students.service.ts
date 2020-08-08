import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Student, Credential } from '../interfaces';
import { StudentModel } from "../components/students/studentModel";
import { StudentUrls } from "../config";
import { Authentication } from "./authentication";

@Injectable()
export class StudentService extends Authentication {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private urls: StudentUrls = new StudentUrls();
  constructor(public http: HttpClient) {
    super(http);
  }
  // Creates a new Class
  public createStudents(studentData: Student[], groupIdentifier: number): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      students: studentData,
      groupId: groupIdentifier
    };
    return this.http.post<any>(this.urls.createStudents, JSON.stringify(data))
      .pipe(catchError(this.authenticateValidation('createStudents')));
  }
  public checkStudentEmail(email: string): Observable<any> {
    return this.http.get<any>(this.urls.checkStudentEmail + "?token=" + window.sessionStorage.getItem("token") + "&email=" + email)
      .pipe(catchError(this.authenticateValidation('checkStudentEmail')));
  }
  public getStudent(term: string): Observable<Student[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any>(this.urls.getStudents + "?token=" + window.sessionStorage.getItem("token") + "&searchTerm=" + term)
      .pipe(catchError(this.authenticateValidation('getStudent')));
  }

  public enrollStudents(classIdentifier: number, studentData: Student[]): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      students: studentData.map((student) => student.ID).toString(),
      classId: classIdentifier
    };
    return this.http.post<any>(this.urls.enrollStudents, JSON.stringify(data))
      .pipe(catchError(this.authenticateValidation('enrollStudents')));
  }

  public withdrawStudents(classIdentifier: number, studentData: Student[]): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      students: studentData.map((student) => student.ID).toString(),
      classId: classIdentifier
    };
    return this.http.post<any>(this.urls.withdrawStudents, JSON.stringify(data))
      .pipe(catchError(this.authenticateValidation('withdrawSetudents')));
  }

  public getRoster(classIdentifier: number): Observable<any> {
    const data = {
      token: window.sessionStorage.getItem("token"),
      classId: classIdentifier
    };

    return this.http.post<any>(this.urls.getStudents, JSON.stringify(data))
      .pipe(catchError(this.authenticateValidation("getRoster")));
  }
}
