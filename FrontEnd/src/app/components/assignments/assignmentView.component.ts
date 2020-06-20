import { Component, ElementRef, ViewChildren, QueryList, Input, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { NgForm } from "@angular/forms";
import { Observable, forkJoin, of } from "rxjs";

import { AssignmentGroupModel, AssignmentItemModel } from "./assignmentModel";

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

export class AssignmentView implements OnInit {
  @ViewChildren(AssignmentList)
  public assignmentItems: QueryList<AssignmentList>;
  @Input()
  public classId: number;
  public assignmentData: AssignmentGroupModel[] = [];
  public storedAssignmentGroups: AssignmentGroupModel[] = [];
  public storedAssignmentItems: AssignmentItemModel[] = [];
  public totalWeight = 0;
  constructor(
    private assignmentService: AssignmentService
  ) {
  }

  public ngOnInit() {
    this.getAssignments();
  }

  public getAssignments() {
    if (!!this.classId) {
      this.assignmentService.getAssignments(this.classId).subscribe((response) => {
        const assignmentGroups: AssignmentGroupModel[] = [];
        const assignmentItems: AssignmentItemModel[] = [];
        response.forEach((assignmentItem: any) => {
          const currGroup = new AssignmentGroupModel(
            this.classId,
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
        this.assignmentData = assignmentGroups.map((item) => Object.assign({}, item));
        this.storedAssignmentGroups = assignmentGroups;
        this.storedAssignmentItems = assignmentItems;
        this.calculateTotalWeight();
      });
    }
  }

  public addAssignment() {
    const tempWeight = this.totalWeight < 100 ? (100 - this.totalWeight) : 1;
    this.assignmentData.push(new AssignmentGroupModel(this.classId,
      "Assignment Group",
      tempWeight,
      null));
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
    // Iterate through the child assignments to get the items
    const assignmentItems = this.assignmentData.map((item, indx) => {
      // Set the Class ID for the current Assignment Group Item
      if (!!classId) {
        item.classId = classId;
      }
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

    return this.assignmentService.createAssignment(this.assignmentData, assignmentItems);
  }

  public updateAssignments(): Observable<any> {
    const newAssignmentGroups: AssignmentGroupModel[] = [];
    const newAssignmentItems: AssignmentItemModel[] = [];
    const deletedAssignmentGroups: number[] = [];
    const deletedAssignmentItems: number[] = [];
    const updatedAssignmentGroups: AssignmentGroupModel[] = [];
    const updatedAssignmentItems: AssignmentItemModel[] = [];

    // Get all of the new groups first
    this.assignmentData.forEach((group: AssignmentGroupModel) => {
      if (!group.ID) {
        // A group was added
        newAssignmentGroups.push(group);
      }
    });

    // Check to see if any existing groups were updated or deleted
    this.storedAssignmentGroups.forEach((storedGroup: AssignmentGroupModel) => {
      let exists = false;
      this.assignmentData.forEach((group: AssignmentGroupModel) => {
        // Check to see if any updates have been made
        if (storedGroup.ID === group.ID) {
          // Matching Item
          exists = true;
          if (storedGroup.weight !== group.weight || storedGroup.title !== group.title) {
            // An existing group has been changed
            updatedAssignmentGroups.push(group);
          }
        }
      });
      if (!exists) {
        // A group was deleted
        deletedAssignmentGroups.push(storedGroup.ID);
      }
    });

    const assignments: AssignmentItemModel[] = [];
    const newAssignmentLists: AssignmentList[] = [];
    this.assignmentItems.toArray().forEach((assignmentList: AssignmentList) => {
      // Get all of the items for processing, separate into new items or existing ones
      if (assignmentList.assignmentId === null) {
        // List of items for a new Group
        newAssignmentLists.push(assignmentList);
      } else {
        assignmentList.assignmentData.forEach((assignmentItem: AssignmentItemModel) => {
          if (assignmentItem.assignmentId !== null && assignmentItem.ID === null) {
            // New Assignment item
            newAssignmentItems.push(assignmentItem);
          } else {
            // Existing
            assignments.push(assignmentItem);
          }
        });
      }
    });

    // Populate the new group assignment List
    const newGroupAssignmentItems: AssignmentItemModel[][] = newAssignmentGroups
      .map((newGroup: AssignmentGroupModel) => {
        let groupList: AssignmentItemModel[] = [];
        // Find the list that corresponds to the current item
        newAssignmentLists.some((newList: AssignmentList) => {
          if (newList.defaultName === newGroup.title) {
            // Match found, set the group list to the data in the Assignment List
            groupList = newList.assignmentData;
            return true;
          }
        });
        return groupList;
      });

    this.storedAssignmentItems.forEach((storedItem: AssignmentItemModel) => {
      // Process existing items for changes
      let exists = false;
      assignments.forEach((item: AssignmentItemModel) => {
        if (item.ID === storedItem.ID) {
          // Match Found
          exists = true;
          if (item.weight !== storedItem.weight
            || item.label !== storedItem.label
            || item.questions !== storedItem.questions) {
            // Item has been changed, push it into the update group
            updatedAssignmentItems.push(item);
          }
        }
      });
      if (exists === false
        && deletedAssignmentGroups.filter((group) => group === storedItem.assignmentId).length === 0) {
        // Items does not belong to a deleted group, so it must be deleted manually
        deletedAssignmentItems.push(storedItem.ID);
      }
    });

    // console.log(newAssignmentGroups, newGroupAssignmentItems,
    //   newAssignmentItems,
    //   updatedAssignmentItems, updatedAssignmentGroups,
    //   deletedAssignmentItems, deletedAssignmentGroups);
    // Update and Delete assignments
    return forkJoin(
      this.assignmentService.createAssignment(newAssignmentGroups, newGroupAssignmentItems),
      this.assignmentService.createAssignmentItems(newAssignmentItems),
      this.assignmentService.deleteAssignmentGroups(deletedAssignmentGroups),
      this.assignmentService.deleteAssignmentItems(deletedAssignmentGroups),
      this.assignmentService.updateAssignmentGroups(updatedAssignmentGroups),
      this.assignmentService.updateAssignmentItems(updatedAssignmentItems)
    );
  }

  public removeAssignment(assignment: AssignmentGroupModel) {
    // Method to remove an assignment group from the list
    this.assignmentData = this.assignmentData.filter((item) => item !== assignment);
    this.calculateTotalWeight();
  }

  public getStoredAssignmentItems(groupId: number): AssignmentItemModel[] {
    return this.storedAssignmentItems.filter((item: AssignmentItemModel) => {
      return item.assignmentId === groupId;
    });
  }
}
