import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import {Student} from "../../../interfaces";

export interface StudentClass{
  ID:number;
  name:string;
  email:string;
}

interface response{
  response:any;
}

export class StudentServiceStub {
  public testData:StudentClass[] = [];
  public studentCreated:number = -1;
  createStudents(students:Student[]):Observable<response>{
    students.forEach((student)=>{
      this.testData.push({
        ID:this.testData.length+1,
        name:student.name,
        email:student.email
      });
    });
    this.studentCreated = this.testData.length;
    return of({response:true});
  }
  checkStudentEmail(email:string):Observable<response>{
    let inUse:boolean = false;
    this.testData.forEach((student)=>{
      inUse = inUse || student.email == email;
    });
    
    return of({response:inUse});
  }
};
