import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/toPromise';
import { Student, Credential } from '../interfaces';
import {StudentModel} from "../components/students/studentModel";
import {StudentUrls} from "../config";
import {Authentication} from "./authentication";

@Injectable()
export class StudentService extends Authentication {
  private headers = new Headers({'Content-Type': 'application/json'});
  private urls:StudentUrls = new StudentUrls();
  constructor (public http: HttpClient){
    super(http);
  }
  //Creates a new Class
  createStudents(studentData:Student[]):Observable<any>{
    let data = {
      token:window.sessionStorage.getItem("token"),
      students:studentData
    };
    return this.http.post<any>(this.urls.createStudents, JSON.stringify(data))
      .pipe(catchError(this.authenticateValidation('createStudents')));
  }
  checkStudentEmail(email:string):Observable<any>{
    return this.http.post<any>(this.urls.checkStudentEmail, JSON.stringify({email:email}));
  }
}
