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
  createStudents(students:Student[]):Observable<any>{
    let studentArray:number[] = [];
    students.forEach((student)=>{
      studentArray.push(this.testData.length+1);
      this.testData.push({
        ID:this.testData.length+1,
        name:student.name,
        email:student.email
      });
    });
    return of({students:studentArray});
  }
  checkStudentEmail(email:string):Observable<response>{
    let inUse:boolean = false;
    this.testData.forEach((student)=>{
      inUse = inUse || student.email == email;
    });

    return of({response:inUse});
  }
};
