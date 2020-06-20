import { Class, ClassDetails, Student, AssignmentItem, Grade } from "../../interfaces";

export class ClassModel implements Class {
  constructor(
    public classTitle: string,
    public classIcon: string,
    public startDate: string,
    public endDate: string,
    public token?: string,
    public classId?: number
  ) {
  }
}

export class ClassDetailModel implements ClassDetails {
  public response: boolean;
  constructor(
    public ID: number,
    public classData: ClassModel,
    public roster: Student[],
    public assignments: AssignmentItem[],
    public grades: Grade[]
  ) { }
}

export class GradeModel implements Grade {
  constructor(
    public gradeId: string,
    public studentId: number,
    public assignmentId: number,
    public grade: number,
    public questionsCorrect?: number,
    public status?: string
  ) { }
}
