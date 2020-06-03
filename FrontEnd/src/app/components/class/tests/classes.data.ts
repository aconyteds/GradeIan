import { Observable, of } from 'rxjs';
import { Class } from "../../../interfaces";

interface Response {
  response: any;
}

export class ClassesServiceStub {
  public testData: Class[] = [];
  public classCreated = -1;
  public createClass(classData: Class): Observable<Response> {
    const tempData: Class = {
      classId: this.testData.length + 1,
      teacherId: classData.teacherId || 1,
      classTitle: classData.classTitle,
      classIcon: classData.classIcon,
      startDate: classData.startDate,
      endDate: classData.endDate,
      classAverage: classData.classAverage || null,
      students: classData.students || null,
      classProgress: classData.classProgress || null
    };
    this.testData.push(tempData);
    this.classCreated = tempData.teacherId;
    return of({ response: !!tempData.teacherId });
  }
  public getClasses(): Observable<any> {
    return of({ classes: this.testData });
  }
}
