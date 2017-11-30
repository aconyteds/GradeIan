import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import {SecurityQuestion} from "../../../interfaces";

export interface TestUser{
  userId:number,
  userName:string,
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  securityQuestion:number,
  securityAnswer:string
}
interface response{
  response:boolean;
}

export class AccountServiceStub {
  public testData:TestUser[] = [{
    userId:1,
    userName:"jdoe6",
    firstName:"John",
    lastName:"Doe",
    email:"mail@mail",
    password:"password",
    securityAnswer:"answer",
    securityQuestion:1
  }];
  getSecurityQuestions():Observable<SecurityQuestion[]>{
    return of([{
      ID:1,
      Question:"Question 1"
    },{
      ID:2,
      Question:"Question 2"
    },{
      ID:3,
      Question:"Question 3"
    }]);
  }
  checkEmail(email:string):Observable<response>{
    this.testData.forEach((user:TestUser)=>{
      if(user.email === email){
        return of({response:!!user.userId});
      }
    });
    return of({response:false});
  }
  checkUserName(userName:string):Observable<response>{
    this.testData.forEach((user:TestUser)=>{
      if(user.userName === userName){
        return of({response:user.userId});
      }
    });
    return of({response:false});
  }
  create(){return ;}
};
