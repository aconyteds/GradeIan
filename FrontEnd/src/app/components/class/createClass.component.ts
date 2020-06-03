import { Component, ViewChild } from '@angular/core';
import { NgClass } from "@angular/common";
import { NgForm, PatternValidator, EmailValidator } from "@angular/forms";
import { Router } from "@angular/router";

import { ClassModel } from "./classModel";
import { classIcons } from "../../config";

import { ClassesService } from "../../services/classes.service";
// import {Class} from "../../interfaces";

import { StudentsView } from "../students/studentsView.component";
import { AssignmentView } from "../assignments/assignmentView.component";

@Component({
  selector: 'create-class',
  styles: [`
      .ng-valid[required], .ng-valid.required  {
        border-left: 5px solid #42A948; /* green */
      }
      .ng-invalid:not(form)  {
        border-left: 5px solid #a94442; /* red */
      }
      .icon-container > span.fa,
      .icon-container > span.fas,
      .icon-container > span.far{
        margin:2px;
        padding:5px;
        cursor:pointer;
        height: 28px;
        width: 28px;
        vertical-align: middle;
        text-align: center;
      }
      .icon-container > span.fa.selected,
      .icon-container > span.fas.selected,
      .icon-container > span.far.selected{
        border:1px solid;
        padding:4px;
      }
    `],
  templateUrl: "./createClass.template.html"
})

export class CreateClass {
  @ViewChild('classRoster') public classRoster: StudentsView;
  @ViewChild('assignments') public assignments: AssignmentView;
  public classData: ClassModel;
  public icons: string[] = classIcons;
  constructor(
    private ClassService: ClassesService,
    private router: Router
  ) {
    this.classData = new ClassModel("", this.icons[0], this.now(), this.now(), window.sessionStorage.getItem("token"));
  }

  public now(): string {
    const now = new Date();
    let month = (now.getMonth() + 1).toString();
    let day = (now.getDate()).toString();
    month = month.length === 2 ? month : "0" + month;
    day = day.length === 2 ? day : "0" + day;
    return now.getFullYear() + "-" + month + "-" + day;
  }

  public selectIcon(iconClass: string) {
    this.classData.classIcon = iconClass;
  }

  public createClass() {
    this.ClassService.createClass(this.classData)
      .subscribe((response: any) => {
        if (!!response.token) {
          // Had to log in again, token expired
          this.createClass();
        } else if (!!response.classId) {
          // Class Created
          // Enroll Students
          this.classRoster.updateStudents(response.classId).subscribe((rosterResponse) => {
            console.log(rosterResponse);
          });
          this.assignments.saveAssignments(response.classId).subscribe((assignmentResponse) => {
            console.log(assignmentResponse);
          });
          // Route to the class
          this.router.navigate(["/home"]);
        } else {
          // Failure
        }
      });
  }
}
