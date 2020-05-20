import { Observable, of, defer } from 'rxjs';
import { Student } from "../../../interfaces";

export interface StudentClass {
  ID: number;
  name: string;
  email: string;
}

interface Response {
  response: any;
}

export class StudentServiceStub {
  public testData: StudentClass[] = [];
  public enrolledStudents: number[] = [];
  public withdrawnStudents: number[] = [];

  public createStudents(students: Student[]): Observable<any> {
    const studentArray: number[] = [];
    students.forEach((student) => {
      studentArray.push(this.testData.length + 1);
      this.testData.push({
        ID: this.testData.length + 1,
        name: student.name,
        email: student.email
      });
    });
    return of({ students: studentArray });
  }

  public checkStudentEmail(email: string): Observable<Response> {
    let inUse = false;
    this.testData.forEach((student) => {
      inUse = (inUse || student.email === email);
    });

    return of({ response: inUse });
  }

  public getStudent(term: string): Observable<Student[]> {
    const studentArray: StudentClass[] = [];
    this.testData.forEach((student) => {
      if (student.name.search(term) > -1 || student.email.search(term) > -1) {
        studentArray.push(student);
      }
    });

    return of(studentArray);
  }

  public enrollStudents(classIdentifier: number, students: Student[]) {
    const response = [];
    students.forEach((student) => {
      this.enrolledStudents.push(student.ID);
      response.push({
        successful: true,
        ID: student.ID
      });
    });
    return of(response);
  }

  public withdrawStudents(classIdentifier: number, students: Student[]) {
    const response = [];
    students.forEach((student) => {
      this.withdrawnStudents.push(student.ID);
      response.push({
        successful: true,
        ID: student.ID
      });
    });
    return of(response);
  }
}

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
