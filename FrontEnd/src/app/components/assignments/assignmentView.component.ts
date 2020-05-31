import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgClass } from "@angular/common";
import {NgForm, PatternValidator, EmailValidator} from "@angular/forms";

import { AssignmentGroupModel, AssignmentItemModel } from "./assignmentModel";

import { AssignmentService } from "../../services/assignment.service";

@Component({
  selector: 'assignment-view',
  styles: [`
    .assignment-container{
        width:100%;
        margin-bottom:10px;
    }

    .assignment-item{
      font-size:20px;
    }
    `],
  templateUrl: "./assignmentView.template.html"
})

export class AssignmentView {
  public invalidEmail = false;
  public assignmentData: AssignmentGroupModel[] = [];
  public totalWeight = 0;
  constructor(
    private assignmentService: AssignmentService
  ) {
  }

  public addAssignment() {
    const tempWeight = this.totalWeight < 100 ? (100 - this.totalWeight) : 1;
    this.assignmentData.push(new AssignmentGroupModel(0,
      "Assignment " + (this.assignmentData.length + 1).toString(),
      tempWeight));
    this.calculateTotalWeight();
  }

  public calculateTotalWeight() {
    let currWeight = 0;
    this.assignmentData.forEach((assignment) => {
      currWeight += assignment.weight;
    });

    this.totalWeight = currWeight;
  }

  public createAssignment(classId: number) {
    // Method called by parent to create assignments
    // this.assignmentService.createAssignment(this.assignmentData);
  }

  public removeAssignment(assignment: AssignmentGroupModel) {
    // Method to remove an assignment group from the list
    this.assignmentData = this.assignmentData.filter((item) => item !== assignment);
    this.calculateTotalWeight();
  }
}
