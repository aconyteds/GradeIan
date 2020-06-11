import { Component, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { ClassesService } from "../../services/classes.service";
import { ClassDetailModel } from "./classModel";
import { ClassGrades } from "./classGrades.component";

import * as helpers from "../../utilities/helpers";

@Component({
  selector: 'view-class',
  styles: [`
    .class-grade-container {
      position:absolute;
      left:0;
      right:0;
      overflow:auto;
    }
    `],
  templateUrl: "./viewClass.template.html"
})

export class ViewClass implements OnInit {
  public classDetails: ClassDetailModel;
  public formatDate = helpers.getContextualDateInformation;
  constructor(
    private classesService: ClassesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    if (!!id) {
      this.getClassDetails(id);
    }
  }

  public getClassDetails(classId: number) {
    this.classesService.getClass(classId).subscribe((classDetails) => {
      if (!!classDetails.response) {
        const responseObject = new ClassDetailModel(parseInt(classDetails.ID, 10),
          {
            classId: classDetails.classData.classId,
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
      } else {
        this.classDetails = null;
      }
    });
  }

  public getHeaderColor(): string {
    const now = new Date();
    const startDate = new Date(this.classDetails.classData.startDate);
    const endDate = new Date(this.classDetails.classData.endDate);

    if (endDate < now) {
      // Past
      return "bg-info";
    } else if (startDate < now && endDate > now) {
      // Current
      return "bg-primary";
    } else {
      // Future
      return "bg-secondary";
    }
  }

  public editClass() {
    this.router.navigate(["/editClass/" + this.classDetails.ID]);
  }
}
