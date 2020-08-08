import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {NgClass} from "@angular/common";
import {NgForm, PatternValidator, EmailValidator} from "@angular/forms";

import {StudentModel} from "./studentModel";

import {StudentService} from "../../services/students.service";
import {Student} from "../../interfaces";

@Component({
  selector: 'create-student',
  styles: [`
      .ng-valid[required], .ng-valid.required  {
        border-color: #42A948; /* green */
      }
      .ng-invalid:not(form)  {
        color: #a94442; /* red */
      }
      .student>span+span{
        border-left:1px solid #ccc;
      }
      .student:nth-child(odd){
        background:#F5F5F5;
      }
      .fa-times:before{
        cursor:pointer;
      }
      .student .fa-times{
        vertical-align:middle;
        line-height:24px;
      }
    `],
  templateUrl: "./createStudent.template.html"
})

export class CreateStudents {
  @Input()
  public groupId!: number;
  @Output()
  public rosterSave = new EventEmitter();
  @ViewChild("studentName", {read: ElementRef}) public studentName: ElementRef;
  public studentData: StudentModel;
  public students: Student[] = [];
  public invalidEmail = false;
  constructor(
    private studentService: StudentService
  ) {
    this.studentData = new StudentModel("", "");
  }
  public checkStudentEmail(): void {
    // Setting an extra variable helps with screen popping :)
    let invalid = false;
    // See if the email is already in the list
    this.students.forEach((student) => {
      // set the validit flag
      invalid = student.email !== "" && student.email === this.studentData.email;
      if (invalid) {
        this.invalidEmail = true;
        return;
      }
    });

    if (!invalid) {
      // Email does not appear to be in the list, not a duplicate here
      this.studentService.checkStudentEmail(this.studentData.email)
        .subscribe((response) => {
          if (response.token) {
            // Failed authentication
            this.checkStudentEmail();
          } else {
            // See if the things exists in the database
            this.invalidEmail = !!response.response;
          }
        });
    }
  }
  public removeStudent(name: string): void {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].name === name) {
        this.students.splice(i, 1);
        return;
      }
    }
  }
  public addStudent(): void {
    if (this.studentData.name) {
      this.students.push({
        name: this.studentData.name,
        email: this.studentData.email === "" ? null : this.studentData.email
      });
      this.studentData = new StudentModel("", "");
      // Reset the input form so that multiple students can be added quickly
      this.studentName.nativeElement.focus();
    }
  }
  public createStudents() {
    this.studentService.createStudents(this.students, this.groupId)
      .subscribe((response) => {
        if (!!response.token) {
          // Had to log in again, token expired
          this.createStudents();
        } else if (!!response.students) {
          // Students Created
          response.students.forEach((studentId: number, indx: number) => {
            this.students[indx].ID = studentId;
          });
          this.rosterSave.emit(this.students.filter((student) => student.ID !== 0));
          // Reset
          this.students = [];
          // Send the student list to the parent handler
          // TODO
        } else {
          // Failure
        }
      });
  }
}
