import { AssignmentItem, AssignmentGroup } from "../../interfaces";

export class AssignmentGroupModel implements AssignmentGroup {
  constructor(
    public classId: number,
    public title: string,
    public weight: number,
    public ID?: number
  ) {}
}

export class AssignmentItemModel implements AssignmentItem {
  constructor(
    public label: string,
    public weight: number,
    public questions?: number,
    public ID?: number,
    public assignmentId?: number
  ) { }
}
