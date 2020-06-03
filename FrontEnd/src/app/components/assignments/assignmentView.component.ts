import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { NgClass } from "@angular/common";
import { NgForm } from "@angular/forms";
import { Observable, forkJoin } from "rxjs";

import { AssignmentGroupModel } from "./assignmentModel";

import { AssignmentService } from "../../services/assignment.service";

import { AssignmentList } from "./assignmentList.component";

@Component({
  selector: 'assignment-view',
  styles: [`
    .assignment-container{
        width:100%;
        margin-bottom:10px;
    }

    .assignment-group{
      font-size:20px;
      border-bottom:1px solid #ccc;
      padding-top:10px;
    }

    .assignment-group:nth-child(even){
      background:#FAFAFA;
    }
    `],
  templateUrl: "./assignmentView.template.html"
})

export class AssignmentView {
  @ViewChildren(AssignmentList)
  public assignmentItems: QueryList<AssignmentList>;
  public assignmentData: AssignmentGroupModel[] = [];
  public totalWeight = 0;
  constructor(
    private assignmentService: AssignmentService
  ) {
  }

  public addAssignment() {
    const tempWeight = this.totalWeight < 100 ? (100 - this.totalWeight) : 1;
    this.assignmentData.push(new AssignmentGroupModel(0,
      "Assignment Group",
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

  public saveAssignments(classId: number): Observable<any> {
    // Method called by parent to create assignments
    const assignments = this.assignmentItems.toArray();
    console.log(assignments);
    // Iterate through the child assignments to get the items
    const assignmentItems = this.assignmentData.map((item, indx) => {
      // Set the Class ID for the current Assignment Group Item
      item.classId = classId;
      // Attempt to get assignments for the Current assignemt Group
      let currItem = assignments[indx];
      // Do a check to make sure that this is the correct assignment group
      if (currItem.defaultName !== item.title) {
        // Not the right group, find the right one
        assignments.some((assignmentItem) => {
          if (assignmentItem.defaultName === item.title) {
            // Right group found, associate and exit out of the array
            currItem = assignmentItem;
            return true;
          }
        });
      }
      return currItem.assignmentData;
    });

    const currRequest = this.assignmentService.createAssignment(this.assignmentData, assignmentItems);
    currRequest.subscribe((response) => {
      console.log(response);
      // return assignmentItems[indx].saveAssignmentItems(response.response);
    });

    return currRequest;
  }

  public removeAssignment(assignment: AssignmentGroupModel) {
    // Method to remove an assignment group from the list
    this.assignmentData = this.assignmentData.filter((item) => item !== assignment);
    this.calculateTotalWeight();
  }
}
