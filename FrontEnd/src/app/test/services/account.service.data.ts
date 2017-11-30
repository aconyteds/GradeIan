import { InMemoryDbService } from 'angular-in-memory-web-api';

import {SecurityQuestion} from '../../interfaces';

export interface TestUser {
  userId:number,
  userName:string,
  firstName:string,
  lastName:string,
  email:string,
  password:string
}

export class AccountDataService implements InMemoryDbService {
  createDb() {
    const users:[TestUser] = [{
      userId:1,
      userName:"jdoe6",
      firstName:"John",
      lastName:"Doe",
      email:"mail@mail",
      password:"password"
    }];
    return {users};
  }
  getSecurityQuestions():SecurityQuestion[]{
    let questions:SecurityQuestion[] = [{
      ID:1,
      Question:"question 1"
    },{
      ID:2,
      Question:"question 2"
    },{
      ID:3,
      Question:"question 3"
    }];

    return questions;
  }
}
