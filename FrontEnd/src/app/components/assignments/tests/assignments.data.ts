import { Observable, of, defer } from 'rxjs';
import { AssignmentItem, AssignmentGroup, Response } from "../../../interfaces";

export class AssignmentServieStub {
  public assignmentGroups: AssignmentGroup[] = [];
  public assignmentItems: AssignmentItem[] = [];

  public createAssignment(assignmentGroups: AssignmentGroup [], assignmentItems: AssignmentItem [][]): Observable<Response> {
    const responseData = [];
    assignmentGroups.forEach((assignment) => {
      assignment.ID = this.assignmentGroups.length + 1;
      this.assignmentGroups.push(assignment);
      const currResponse = {
        assignmentId: assignment.ID,
        itemIds: []
      };
      assignmentItems.forEach((items) => {
        items.forEach((item) => {
          item.ID = this.assignmentItems.length + 1;
          item.assignmentId = assignment.ID;
          this.assignmentItems.push(item);
          currResponse.itemIds.push(item.ID);
        });
      });
      responseData.push(currResponse);
    });
    return of({response: responseData});
  }

  public createAssignmentItem(assignmentItem: AssignmentItem) {
    assignmentItem.ID = this.assignmentItems.length;
    this.assignmentItems.push(assignmentItem);
    return of({response: assignmentItem.ID});
  }
}
