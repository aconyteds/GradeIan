import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Class } from "../../../interfaces";
import { ClassDetailModel } from "../classModel";

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

  public getClass(classIdentifier: number): Observable<any> {
    if (classIdentifier > 0) {
      const mockClass = new ClassDetailModel(classIdentifier,
      {
        classTitle: "Class Title 101",
        classIcon: "fas fa-trash",
        startDate: new Date( new Date().getMilliseconds() - 20000).toDateString(),
        endDate: new Date( new Date().getMilliseconds() + 20000).toDateString()
      }, [
        {ID: 1, name: "john Doe", email: "jd@mail.com"},
        {ID: 2, name: "jane doe", email: "jade@mail.com"},
        {ID: 3, name: "bimmy", email: "bimmy@mail.com"}
      ], [
        {ID: 0, label: "Assignment 1", weight: 30, questions: 10, assignmentId: 0},
        {ID: 1, label: "Assignment 2", weight: 30, questions: 15, assignmentId: 0},
        {ID: 2, label: "Assignment 3", weight: 30, questions: 20, assignmentId: 0},
        {ID: 3, label: "Homework 1", weight: 100, questions: 10, assignmentId: 1},
        {ID: 4, label: "Quiz 1", weight: 50, questions: 10, assignmentId: 2},
        {ID: 5, label: "Quiz 2", weight: 50, questions: 15, assignmentId: 2},
        {ID: 6, label: "Test 1", weight: 100, questions: 50, assignmentId: 3}
      ], [
        {gradeId: "0_1", studentId: 1, assignmentId: 0, grade: 100, questionsCorrect: 10},
        {gradeId: "0_2", studentId: 2, assignmentId: 0, grade: 100, questionsCorrect: 10},
        {gradeId: "0_3", studentId: 3, assignmentId: 0, grade: 100, questionsCorrect: 10},
        {gradeId: "1_1", studentId: 1, assignmentId: 1, grade: 100, questionsCorrect: 15},
        {gradeId: "1_2", studentId: 2, assignmentId: 1, grade: 66.67, questionsCorrect: 10},
        {gradeId: "1_3", studentId: 3, assignmentId: 1, grade: 80, questionsCorrect: 12},
        {gradeId: "2_1", studentId: 1, assignmentId: 2, grade: 100, questionsCorrect: 20},
        {gradeId: "2_2", studentId: 2, assignmentId: 2, grade: 50, questionsCorrect: 10},
        {gradeId: "2_3", studentId: 3, assignmentId: 2, grade: 80, questionsCorrect: 16},
        {gradeId: "3_1", studentId: 1, assignmentId: 3, grade: 100, questionsCorrect: 10},
        {gradeId: "3_2", studentId: 2, assignmentId: 3, grade: 60, questionsCorrect: 6},
        {gradeId: "3_3", studentId: 3, assignmentId: 3, grade: 80, questionsCorrect: 8},
        {gradeId: "4_1", studentId: 1, assignmentId: 4, grade: 100, questionsCorrect: 10},
        {gradeId: "4_2", studentId: 2, assignmentId: 4, grade: 50, questionsCorrect: 5}
      ]);
      mockClass.response = true;
      return of(mockClass);
    } else {
      return of({
        response: false
      });
    }
  }
}
