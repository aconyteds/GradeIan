import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, Credential } from "../interfaces";
import { AuthenticationUrls } from "../config";
import { catchError, tap } from 'rxjs/operators';
import * as helpers from "../utilities/helpers";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Authentication {
  private loginUrl: AuthenticationUrls = new AuthenticationUrls();
  constructor(public http: HttpClient) { }
  public login(credentials: Login): Observable<Credential> {
    return this.http.post<Credential>(this.loginUrl.login, JSON.stringify(credentials));
  }

  public checkYourPrivelege(): Observable<any> {
    return this.http.post<Credential>(this.loginUrl.checkYourPrivelege, JSON.stringify({token: window.sessionStorage.getItem("token")}))
      .pipe(catchError(this.authenticateValidation('checkYourPrivelege')));
  }

  public authenticateValidation<T>( operation = 'operation') {
    return (error: any) => {
      if (error.status === 401) {
        if (window.sessionStorage.getItem("userName") && window.sessionStorage.getItem("loginCredential")) {
          const creds: Login = {
            userName: window.sessionStorage.getItem("userName"),
            password: window.sessionStorage.getItem("loginCredential")
          };
          return this.login(creds).pipe(tap((response) => {
            if (helpers.validateToken(response.token)) {
              // Token exists
              window.sessionStorage.setItem("token", response.token);
            } else {
              // Error logging in - Password must have changed
              window.sessionStorage.setItem("token", null);
              // Redirect the user to the login page
              window.location.replace(window.location.origin + "/login");
            }
          }));
        }
      }
    };
    // Function will handle authentication for items that require it
  }
}
