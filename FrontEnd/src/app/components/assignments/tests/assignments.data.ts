import { Observable, of, defer } from 'rxjs';
import { AssignmentItem, AssignmentGroup, Response } from "../../../interfaces";

export class AssignmentServieStub {
  public assignmentGroups: AssignmentGroup[] = [];
  public assignmentItems: AssignmentItem[] = [];

  public createAssignment(assignment: AssignmentGroup): Observable<Response> {
    assignment.ID = this.assignmentGroups.length;
    this.assignmentGroups.push(assignment);
    return of({response: assignment.ID});
  }
}
