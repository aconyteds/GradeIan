import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import {Class} from "../../../interfaces";

export interface TestClass{
  teacherId:number;
  classTitle:string;
  classIcon:string;
  startDate:Date;
  endDate:Date;
}

interface response{
  response:any;
}

export class ClassesServiceStub {
  public testData:TestClass[] = [];
  public classCreated:number = -1;
  createClass(classData:Class):Observable<response>{
    var tempData:TestClass = {
      teacherId:this.testData.length||1,
      classTitle:classData.classTitle,
      classIcon:classData.classIcon,
      startDate:classData.startDate,
      endDate:classData.endDate
    };
    this.testData.push(tempData);
    this.classCreated = tempData.teacherId;
    return of({response:!!tempData.teacherId});
  }
};
