import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/toPromise';
import { Class, Credential } from '../interfaces';
import {ClassModel} from "../components/class/classModel";
import {ClassesUrls} from "../config";
import {Authentication} from "./authentication";

@Injectable()
export class ClassesService extends Authentication {
  private headers = new Headers({'Content-Type': 'application/json'});
  private urls:ClassesUrls = new ClassesUrls();
  constructor (public http: HttpClient){
    super(http);
  }
  //Creates a new Class
  createClass(classData:ClassModel):Observable<any>{
    return this.http.post<any>(this.urls.createClass, JSON.stringify(classData))
      .pipe(catchError(this.authenticateValidation('createClass')));;
  }
}
