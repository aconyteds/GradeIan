import { Component, ViewChild, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { NgForm, PatternValidator, EmailValidator } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { forkJoin, Observable } from "rxjs";

import { ClassModel, ClassDetailModel } from "./classModel";
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

export class CreateClass implements OnInit {
  @ViewChild('classRoster') public classRoster: StudentsView;
  @ViewChild('assignments') public assignments: AssignmentView;
  public classData: ClassModel;
  public icons: string[] = classIcons;
  public classId: number;
  public classDetails: ClassDetailModel;
  public deleteTitleMatch = false;
  constructor(
    private classesService: ClassesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.classData = new ClassModel("", this.icons[0], this.now(), this.now(), window.sessionStorage.getItem("token"));
  }

  public ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.classId = id;

    if (!!this.classId) {
      this.getClassDetails(this.classId);
    }
  }

  public getClassDetails(id: number) {
    this.classesService.getClass(id).subscribe((classDetails) => {
      if (!!classDetails.response) {
        const responseObject = new ClassDetailModel(parseInt(classDetails.ID, 10),
          {
            classTitle: classDetails.classData.classTitle,
            classIcon: classDetails.classData.classIcon,
            startDate: classDetails.classData.startDate,
            endDate: classDetails.classData.endDate
          },
          classDetails.roster.map((student: any) => {
            return {
              ID: parseInt(student.ID, 10),
              name: student.name,
              email: student.email
            };
          }),
          classDetails.assignments.map((assignment: any) => {
            return{
              ID: parseInt(assignment.ID, 10),
              assignmentId: parseInt(assignment.groupId, 10),
              label: assignment.label,
              weight: parseFloat(assignment.weight),
              questions: parseInt(assignment.questions, 10),
              overallWeight: parseFloat(assignment.overallWeight)
            };
          }),
           classDetails.grades.map((grade: any) => {
            return {
              gradeId: grade.gradeId,
              studentId: parseInt(grade.studentId, 10),
              assignmentId: parseInt(grade.assignmentId, 10),
              grade: parseFloat(grade.grade),
              questionsCorrect: parseInt(grade.questionsCorrect, 10)
            };
          }));
        this.classDetails = responseObject;
        this.classData = this.classDetails.classData;
        this.classData.classId = classDetails.ID;
      } else {
        this.classDetails = null;
      }
    });
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
    this.classesService.createClass(this.classData)
      .subscribe((response: any) => {
        if (!!response.token) {
          // Had to log in again, token expired
          this.createClass();
        } else if (!!response.classId) {
          // Class Created
          forkJoin({
            // Enroll Students
            students: this.classRoster.enrollStudents(response.classId),
            // Create Assignments
            assignments: this.assignments.saveAssignments(response.classId)
          }).subscribe((responses) => {
            // console.log(responses);
            // Route to the class
            this.router.navigate(["/home"]);
          });
        } else {
          // Failure
        }
      });
  }

  public updateClass() {
    this.classesService.updateClass(this.classData)
      .subscribe((response: Response) => {
        if (response) {
          forkJoin({
            students: this.classRoster.updateStudents(),
            // Save assignment Changes
            assignments: this.assignments.updateAssignments()
          }).subscribe((responses) => {
            // console.log(responses);
            this.router.navigate(["/class/" + this.classData.classId]);
          });
        }
      });
  }

  public returnToClass() {
    if (this.classId) {
      this.router.navigate(["/class/" + this.classData.classId]);
    }
  }

  public checkDeleteTitle(deleteTitle: string) {
    this.deleteTitleMatch = (deleteTitle === this.classData.classTitle);
  }

  public deleteClass() {
    // Delete the Class
    if (!!this.deleteTitleMatch) {
      this.classesService.deleteClass(this.classId)
        .subscribe((response: Response) => {
          if (!!response) {
            this.router.navigate(["/home"]);
          } else {
            // There was a problem deleting the class
          }
        });
    }
  }
}
