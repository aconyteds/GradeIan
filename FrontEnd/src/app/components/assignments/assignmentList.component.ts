import { Component, Input } from '@angular/core';
import { NgClass } from "@angular/common";
import { NgForm, PatternValidator } from "@angular/forms";
import { Observable } from "rxjs";
import { Response } from "../../interfaces";

import { AssignmentItemModel } from "./assignmentModel";

import { AssignmentService } from "../../services/assignment.service";

@Component({
  selector: 'assignment-list',
  styles: [`
    .assignment-list{
        width:100%;
        margin-bottom:10px;
    }

    .assignment-item-container .row{
      padding:5px 0;
      border-bottom:1px solid #ccc;
      margin-bottom:0;
    }

    .close-icon{
      position:absolute;
      left:100%;
      top:50%;
      transform:translate(-50%, -50%);
      padding:5px;
    }
    `],
  templateUrl: "./assignmentList.template.html"
})

export class AssignmentList {
  @Input()
  public defaultName = "Assignment";

  public assignmentData: AssignmentItemModel[] = [];
  public totalWeight = 0;
  constructor(
    private assignmentService: AssignmentService
  ) {
  }

  public addAssignmentItem() {
    const tempWeight = (this.totalWeight < 100 ? (100 - this.totalWeight) : 1);
    this.assignmentData.push(new AssignmentItemModel(
      (this.defaultName + " " + (this.assignmentData.length + 1).toString()),
      tempWeight,
      10));
    this.calculateTotalWeight();
  }

  public removeAssignmentItem(assignment: AssignmentItemModel) {
    // Method to remove an assignment item from the list
    this.assignmentData = this.assignmentData.filter((item) => item !== assignment);
    this.calculateTotalWeight();
  }

  public calculateTotalWeight() {
    let currWeight = 0;
    this.assignmentData.forEach((assignment) => {
      currWeight += assignment.weight;
    });

    this.totalWeight = currWeight;
  }

  public autoAssignWeight(assignment?: AssignmentItemModel) {
    // This method will evenly change the weight for all items after the updated item
    let remainingWeight = 100;
    let remainingItems = this.assignmentData.length;
    let calculatedWeight = 0;
    if (!assignment) {
      calculatedWeight = (100 / this.assignmentData.length);
    }
    this.assignmentData.forEach((item) => {
      if (!calculatedWeight) {
        remainingItems--;
        remainingWeight -= item.weight;
        if (item === assignment && remainingItems !== 0 && remainingWeight > 0) {
          calculatedWeight = remainingWeight / remainingItems;
        }
      } else {
        item.weight = calculatedWeight;
      }
    });
    this.calculateTotalWeight();
  }
}
