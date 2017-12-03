import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Login, Credential} from "../interfaces";
import {AuthenticationUrls} from "../config";
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Authentication {
  private loginUrl:string = new AuthenticationUrls().login;
  constructor(public http: HttpClient) { }
  public login(credentials:Login): Observable<Credential>{
    return this.http.post<Credential>(this.loginUrl, JSON.stringify(credentials));
  }

  authenticateValidation<T>(operation = 'operation'){
    return (error:any) =>{
      if(error.status === 401){
        if(window.sessionStorage.getItem("userName") && window.sessionStorage.getItem("password")){
          let creds:Login = {
            userName:window.sessionStorage.getItem("userName"),
            password:window.sessionStorage.getItem("password")
          }
          var handler;
          return this.login(creds).pipe(tap(response =>{
            if(response.token.search(/[a-zA-Z]/)>-1){
              //Token exists
              window.sessionStorage.setItem("token", response.token);
            }
            else{
              //Error logging in - Password must have changed
            }
          }));
        }
      }
    }


    //Function will handle authentication for items that require it
  }
}
