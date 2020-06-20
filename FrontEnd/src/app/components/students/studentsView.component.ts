import { Component, OnInit, Input } from '@angular/core';
import { Observable, forkJoin, of } from "rxjs";
import { NgClass } from "@angular/common";
import { NgForm, PatternValidator, EmailValidator } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { StudentService } from "../../services/students.service";
import { StudentModel } from "./studentModel";

@Component({
  selector: 'students-view',
  styles: [`
    .student-container{
        width:100%;
        margin-bottom:10px;
    }

    .student-item{
      font-size:20px;
    }

    .close-icon{
      cursor:pointer;
    }
  `],
  template: `
  <div class="student-container">
    <div class="no-students" *ngIf="students.length===0">Use the Search bar below to add students</div>
    <ul *ngIf="students.length>0" class="col  list-group">
      <li *ngFor="let student of students" class="student-item list-group-item d-flex justify-content-between align-items-center">
        {{student.name}}
        <div class="badge close-icon btn btn-danger" (click)="removeStudent(student)"><i class="fas fa-times"></i></div>
      </li>
    </ul>
  </div>
  <add-student (addStudent)="addStudent($event)"></add-student>
  <create-student class="row" style="margin-bottom:10px;" ></create-student>
  `
})

export class StudentsView implements OnInit {
  @Input()
  public classId: number;
  public students: StudentModel[] = [];
  private enrollableStudents: StudentModel[] = [];
  private withdrawableStudents: StudentModel[] = [];
  public classRoster: StudentModel[] = [];
  constructor(
    private studentService: StudentService
  ) {
  }

  private checkList(student: StudentModel, list: StudentModel[]): number {
    let index = -1;
    list.some((studentItem, indx) => {
      if (studentItem.ID === student.ID) {
        index = indx;
        return true;
      }
      return false;
    });
    return index;
  }

  public ngOnInit(): void {
    // FUTURE:: Get Students for a class
    if (!!this.classId) {
      this.getStudents();
    }
  }

  public getStudents() {
    this.studentService.getRoster(this.classId).subscribe((response) => {
      this.students = response;
      // Setup the handler for adding students to the classes array
      this.classRoster = this.students.slice();
    });
  }

  public removeStudent(student: StudentModel): void {
    const rosterIndex = this.checkList(student, this.classRoster);
    let action = "none";
    if (rosterIndex !== -1) {
      // In the roster, need to add to withdraw list
      action = "withdraw";
    }
    if (this.checkList(student, this.withdrawableStudents) === -1 && action === "withdraw") {
      // Not in the student list, needs to be added
      this.withdrawableStudents.push(student);
    }
    this.students = this.students.filter((studentListItem) => student.ID !== studentListItem.ID);
    // Update the list of enrollable students
    this.enrollableStudents = this.enrollableStudents.filter((enrollableStudent) => student.ID !== enrollableStudent.ID);
  }

  public addStudent(student: StudentModel) {
    // Set the Default action to Enroll
    let action = "enroll";
    if (this.checkList(student, this.classRoster) !== -1) {
      // In the roster, no action needs to be taken
      action = "none";
    }
    if (this.checkList(student, this.students) === -1) {
      // Not in the student list, needs to be added
      this.students.push(student);
    }
    if (this.checkList(student, this.enrollableStudents) === -1 && action === "enroll") {
      this.enrollableStudents.push(student);
    }
    this.withdrawableStudents = this.withdrawableStudents.filter((withdrawableStudent) => student.ID !== withdrawableStudent.ID);
  }

  public updateStudents(): Observable<any> {
    return forkJoin(this.enrollStudents(this.classId), this.withdrawStudents(this.classId));
  }

  public enrollStudents(classIdentifier: number): Observable<any> {
    // Enrolls students in the current class
    if (classIdentifier !== null && this.enrollableStudents.length > 0) {
      return this.studentService.enrollStudents(classIdentifier, this.enrollableStudents);
    } else {
      return of({});
    }
  }

  public withdrawStudents(classIdentifier: number): Observable<any> {
    // Withdraws students in the current class
    if (classIdentifier !== null && this.withdrawableStudents.length > 0) {
      return this.studentService.withdrawStudents(classIdentifier, this.withdrawableStudents);
    } else {
      return of({});
    }
  }
}
