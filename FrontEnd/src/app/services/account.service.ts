import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/toPromise';
import { User, SecurityQuestion, Login, Credential, NewAccount } from '../interfaces';
import {AccountUrls} from "../config";
import {Authentication} from "./authentication";

@Injectable()
export class AccountService extends Authentication {
  private headers = new Headers({'Content-Type': 'application/json'});
  private urls:AccountUrls = new AccountUrls();
  constructor (public http: HttpClient){
    super(http);
  }
  //Checks whether a user name is in use or not
  checkUserName(userName:string):Observable<boolean>{
    return this.http.get<boolean>(this.urls.checkUserName+`?userName=${userName}`);
  }
  //Checks if an email is in user or not
  checkEmail(email:string):Observable<boolean>{
    return this.http.get<boolean>(this.urls.checkEmail+`?email=${email}`);
  }
  //Gets the security questions from the database
  getSecurityQuestions():Observable<SecurityQuestion[]>{
    return this.http.get<SecurityQuestion[]>(this.urls.getSecurityQuestions);
  }
  //Create a new account
  create(user: User): Observable<NewAccount> {
    return this.http.post<NewAccount>(this.urls.createAccount, JSON.stringify(user));
  }
  getUserDetails(token:string): Observable<any>{
    return this.http.post<any>(this.urls.getUserDetails, JSON.stringify({"token":token}))
      .pipe(catchError(this.authenticateValidation('getUserDetails')));
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
