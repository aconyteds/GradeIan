import { Observable, of } from 'rxjs';
import { SecurityQuestion } from "../../../interfaces";

export interface TestUser {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  securityQuestion: number;
  securityAnswer: string;
  licenseKey: string;
}

interface Response {
  response: boolean;
}

export class AccountServiceStub {
  public testData: TestUser[] = [{
    userId: 1,
    userName: "jdoe6",
    firstName: "John",
    lastName: "Doe",
    email: "mail@mail",
    password: "password",
    securityAnswer: "answer",
    securityQuestion: 1,
    licenseKey: "123456789ASDFGT"
  }];

  public getSecurityQuestions(): Observable<SecurityQuestion[]> {
    return of([{
      ID: 1,
      Question: "Question 1"
    }, {
      ID: 2,
      Question: "Question 2"
    }, {
      ID: 3,
      Question: "Question 3"
    }]);
  }

  public checkEmail(email: string): Observable<Response> {
    this.testData.forEach((user: TestUser) => {
      if (user.email === email) {
        return of({ response: !!user.userId });
      }
    });
    return of({ response: false });
  }

  public checkUserName(userName: string): Observable<Response> {
    this.testData.forEach((user: TestUser) => {
      if (user.userName === userName) {
        return of({ response: user.userId });
      }
    });
    return of({ response: false });
  }

  public create() { return; }
}
