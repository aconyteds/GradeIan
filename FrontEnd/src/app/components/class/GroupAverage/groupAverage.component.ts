import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AssignmentService } from "../../../services/assignment.service";
import { AssignmentItem, Grade, GradeBookItem, } from "../../../interfaces";
import { AssignmentGroupModel, AssignmentItemModel } from "../../assignments/assignmentModel";

import * as helpers from "../../../utilities/helpers";

interface StudentSummary {
  average: number;
  name: string;
  grades: number[];
}

@Component({
  selector: 'app-group-average',
  styleUrls: ["./groupAverage.scss"],
  templateUrl: "./groupAverage.template.html"
})
export class GroupAverage implements OnInit, OnChanges {
  @Input()
  public minPassing!: number;
  @Input()
  public gradeBook: GradeBookItem[] = [];
  public summaryGrades: StudentSummary[] = [];
  public assignmentGroups: AssignmentGroupModel[] = [];
  public assignmentItems: AssignmentItemModel[] = [];
  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.assignmentService.getAssignments(id).subscribe((response) => {
      const assignmentGroups: AssignmentGroupModel[] = [];
      const assignmentItems: AssignmentItemModel[] = [];
      response.forEach((assignmentItem: any) => {
        const currGroup = new AssignmentGroupModel(
          id,
          assignmentItem.groupTitle,
          parseFloat(assignmentItem.groupWeight),
          parseInt(assignmentItem.groupId, 10)
        );
        const currItem = new AssignmentItemModel(
          assignmentItem.label,
          parseFloat(assignmentItem.weight),
          parseInt(assignmentItem.questions, 10),
          parseInt(assignmentItem.ID, 10),
          parseInt(assignmentItem.groupId, 10)
        );
        if (!assignmentGroups
          .some((group: AssignmentGroupModel) => group.ID === currGroup.ID)) {
          assignmentGroups.push(currGroup);
        }
        assignmentItems.push(currItem);
      });

      this.assignmentGroups = assignmentGroups;
      this.assignmentItems = assignmentItems;
    });
  }

  public ngOnChanges() {
    // We just need to detect changes
  }

  public calculateSummary() {
    const summaryStudents: StudentSummary[] = [];
    this.gradeBook.forEach((student: GradeBookItem) => {
      const summaryStudent = {
        average: 0,
        name: student.studentDetails.name,
        grades: []
      };
      const totalWeight = this.getTotalWeight();
      this.assignmentGroups.forEach((currGroup: AssignmentGroupModel) => {
        let groupGrade = 0;
        const groupWeight = this.getGroupTotalWeight(currGroup.ID);
        this.assignmentItems.filter((item: AssignmentItem) => item.assignmentId === currGroup.ID)
        .forEach((assignmentItem: AssignmentItem) => {
          student.grades.some((currGrade: Grade) => {
            if (currGrade.assignmentId === assignmentItem.ID) {
              groupGrade += currGrade.grade * (assignmentItem.weight / groupWeight);
              return true;
            }
          });
        });
        summaryStudent.grades.push(groupGrade);
        summaryStudent.average += groupGrade * (currGroup.weight / totalWeight);
      });
      summaryStudents.push(summaryStudent);
    });
    this.summaryGrades = summaryStudents;
  }

  public getTotalWeight(): number {
    let totalWeight = 0;
    this.assignmentGroups.forEach((item: AssignmentGroupModel) => {
      totalWeight += item.weight;
    });

    return totalWeight;
  }

  public getGroupTotalWeight(assignmentId: number): number {
    let totalWeight = 0;
    this.assignmentItems.forEach((item: AssignmentItemModel) => {
      if (item.assignmentId === assignmentId) {
        totalWeight += item.weight;
      }
    });
    return totalWeight;
  }

  public getGroupAverages(): number[] {
    let rollingAverage = 0;
    const groupAverages: number[] = [];
    this.assignmentGroups.forEach((groupItem: AssignmentGroupModel, indx: number) => {
      let currGroupAverage = 0;
      this.summaryGrades.forEach((student: StudentSummary) => {
        if (!indx) {
          rollingAverage += student.average;
        }
        currGroupAverage += student.grades[indx];
      });
      groupAverages.push(currGroupAverage / this.summaryGrades.length);
    });
    groupAverages.push(rollingAverage / this.summaryGrades.length);
    return groupAverages;
  }

  public getGradeColor(grade: number): string {
    return helpers.getGradeColor(grade, this.minPassing);
  }
}
