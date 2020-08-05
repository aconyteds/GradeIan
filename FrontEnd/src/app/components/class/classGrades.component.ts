import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";

import { ClassesService } from "../../services/classes.service";
import { GradeModel } from "./classModel";
import { Student, AssignmentItem, Grade, GradeBookItem } from "../../interfaces";

import * as helpers from "../../utilities/helpers";

@Component({
  selector: 'class-grades',
  styles: [`
    .assignment-header{
      display: inline-block;
      white-space: nowrap;
    }

    .grade-grid-section {
      width:100%;
      margin:10px 0;
      overflow:auto;
      max-height: 500px;
    }

    .grade-grid {
      position: relative;
      max-height:150px;
      max-width:100%;
      overflow: auto;
      margin:0 auto;
      border-collapse: separate;
    }

    .grade-grid th{
      top:0;
      background-color:#fff;
      overflow:visible;
    }

    .grade-grid tbody th:first-child,
    .grade-grid tfoot th:first-child{
      z-index:1;
    }

    .grade-grid tbody th:first-child,
    .grade-grid tfoot th:first-child,
    .grade-grid thead th:first-child{
      left: 0;
    }

    .grade-grid th,
    .grade-grid tbody th:first-child,
    .grade-grid tfoot th:first-child{
      position:sticky;
    }

    .grade-grid td{
      padding:5px 10px;
      vertical-align: middle;
    }

    .grade-grid.grade td{
      min-width:100px;
    }

    .grade-grid.questions td{
      min-width:175px;
    }

    .grade-grid tbody tr:nth-child(even){
      background-color:#FAFAFA;
    }
    `],
  templateUrl: "./classGrades.template.html"
})

export class ClassGrades implements OnInit {
  @Input()
  public roster: Student [];
  @Input()
  public assignments: AssignmentItem [];
  @Input()
  public minPassing = 75;
  public gradeBook: GradeBookItem[];
  public allGrades: Grade[];
  public autoSave = true;
  public editModes = ["grade", "questions"];
  public editMode = "grade";
  public assignmentAverages: number[];
  public classAverage = 100;
  public pendingChanges = false;
  public selectedStudent: GradeBookItem;
  public selectedAssignment: AssignmentItem;
  constructor(
    private classesService: ClassesService
  ) { }

  public ngOnInit() {
    if (this.assignments.length > 0 && this.roster.length > 0) {
      this.getGrades();
    }
  }

  public getGrades() {
    this.classesService.getAssignmentGrades(this.assignments).subscribe((response) => {
      const responseGrades = response.grades.map((gradeItem) => {
        return new GradeModel(parseInt(gradeItem.gradeId, 10),
        parseInt(gradeItem.studentId, 10),
        parseInt(gradeItem.assignmentId, 10),
        parseFloat(gradeItem.grade),
        parseInt(gradeItem.questionsCorrect, 10),
        "saved"
      );
      });
      this.buildGradeBook(responseGrades);
    });
  }

  public buildGradeBook(existingGrades: Grade[]) {
    this.gradeBook = [];
    this.allGrades = [];
    this.roster.forEach((student) => {
      const currItem = {
        studentDetails: student,
        average: 0,
        grades: []
      };
      this.assignments.forEach((assignment) => {
        const exists = existingGrades.some((gradeItem) => {
          if (gradeItem.studentId === student.ID && gradeItem.assignmentId === assignment.ID) {
            currItem.grades.push(gradeItem);
            return true;
          }
        });
        if (!exists) {
          currItem.grades.push(new GradeModel(null,
            student.ID,
            assignment.ID,
            0,
            0,
            "empty"
          ));
        }
      });
      this.gradeBook.push(currItem);
      this.allGrades = this.allGrades.concat(currItem.grades);
    });
    this.calculateAverages();
  }

  private calculateGrade(newGrade: Grade): Grade {
    const updatedGrade = newGrade;
    const currAssignment = this.assignments.filter((assignment) => assignment.ID === newGrade.assignmentId )[0];
    if (this.editMode === "questions" && currAssignment.questions !== 0) {
      if (updatedGrade.questionsCorrect > currAssignment.questions) {
        updatedGrade.questionsCorrect = currAssignment.questions;
      } else if ( updatedGrade.questionsCorrect < 0 || updatedGrade.questionsCorrect === null) {
        updatedGrade.questionsCorrect = 0;
      }
      updatedGrade.grade = (updatedGrade.questionsCorrect / currAssignment.questions) * 100;
    }

    if (this.editMode === "grade") {
      if (updatedGrade.grade > 100) {
        updatedGrade.grade = 100;
      } else if (updatedGrade.grade < 0) {
        updatedGrade.grade = 0;
      }
      if (currAssignment.questions !== 0) {
        updatedGrade.questionsCorrect = Math.round(currAssignment.questions * (updatedGrade.grade / 100));
      }
    }
    return updatedGrade;
  }

  public calculateAverages() {
    this.calculateStudentAverages();
    this.calculateAssignmentAverages();
  }

  public calculateStudentAverages() {
    let classAverage = 0;
    this.gradeBook.forEach((student) => {
      let currAverage = 0;
      let totalWeight = 0;
      student.grades.forEach((grade) => {
        if (grade.status !== "empty") {
          this.assignments.some((assignment) => {
            if (assignment.ID === grade.assignmentId) {
              totalWeight += assignment.overallWeight;
              currAverage += grade.grade * (assignment.overallWeight / 100);
              return true;
            }
          });
        }
      });
      if (totalWeight > 0) {
        student.average = Math.fround((currAverage / totalWeight) * 100);
      } else {
        student.average = 100;
      }
      classAverage += student.average;
    });
    this.classAverage = Math.fround(classAverage / this.gradeBook.length);
  }

  public calculateAssignmentAverages() {
    const assignmentGrades = [];
    this.assignments.forEach((assignment) => {
      const gradeData = [];
      this.gradeBook.forEach((gradeBookItem) => {
        gradeBookItem.grades.some((gradeItem) => {
          if (gradeItem.assignmentId === assignment.ID) {
            gradeData.push(gradeItem.grade);
            return true;
          }
        });
      });
      assignmentGrades.push({grades: gradeData});
    });

    this.assignmentAverages = assignmentGrades.map((assignment) => {
      if (assignment.grades.length > 0) {
        let sum = 0;
        assignment.grades.forEach((score: string) => {
          sum += parseFloat(score);
        });
        return Math.fround(sum / assignment.grades.length);
      } else {
        return 0;
      }
    });

    this.assignments.forEach((assignment, indx: number) => {
      assignment.average = this.assignmentAverages[indx];
    });
  }

  public saveGrade(newGrade: Grade) {
    // Method to save an individual grade
    newGrade = this.calculateGrade(newGrade);
    if (!this.autoSave) {
      newGrade.status = "pending";
      this.pendingChanges = true;
    } else {
      // Save the changes automatically
      this.classesService.saveGrade(newGrade).subscribe((response) => {
        this.pendingChanges = false;
        const status = !!parseInt(response, 10);
        if (status) {
          newGrade.status = "saved";
        } else {
          newGrade.status = "failed";
        }
        this.calculateAverages();
      });
    }
    this.calculateAverages();
  }

  public saveGrades() {
    // Method to save all grades
    this.pendingChanges = false;
    const gradeData = this.getPendingGrades();
    if (gradeData.length > 0) {
      this.classesService.saveGrades(gradeData).subscribe((response) => {
        gradeData.forEach((gradeItem: Grade) => {
          const status = !!parseInt(response, 10);
          if (status) {
            gradeItem.status = "saved";
          } else {
            gradeItem.status = "failed";
          }
          this.calculateAverages();
        });
      });
    }
  }

  public getGradeColor(grade: number): string {
    return helpers.getGradeColor(grade, this.minPassing);
  }

  public getPendingGrades(): Grade[] {
    return this.allGrades.filter((grade) => grade.status === "pending");
  }

  public toggleAutoSave() {
    this.autoSave = !this.autoSave;
    if (!!this.autoSave) {
      this.saveGrades();
    }
  }

  public changeEditMode(mode: string) {
    this.editMode = mode;
  }

  public checkPending(): boolean {
    return this.gradeBook.some((student) => {
      return student.grades.some((grade) => grade.status === "pending");
    });
  }

  public selectStudent(student: GradeBookItem) {
    this.selectedStudent = student;
  }

  public selectAssignment(assignment: AssignmentItem) {
    this.selectedAssignment = assignment;
  }

  public getGrade(studentId: number, assignmentId: number): Grade {
    let selectedGrade: Grade = null;
    this.allGrades.some((grade) => {
      if (grade.studentId === studentId && grade.assignmentId === assignmentId) {
        selectedGrade = grade;
        return true;
      }
    });
    return selectedGrade;
  }
}
