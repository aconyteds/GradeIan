export interface User {
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  securityQuestion?: number;
  securityAnswer?: string;
  userName?: string;
  licenseKey?: string;
  password?: string;
}

export interface NewAccount {
  newUserID: string;
}

export interface SecurityQuestion {
  ID: number;
  Question: string;
}

export interface Login {
  userName: string;
  password: string;
}

export interface Credential {
  token: string;
}

export interface Class {
  classId?: number;
  classTitle: string;
  classIcon?: string;
  startDate?: string;
  endDate?: string;
  teacherId?: number;
  students?: number;
  classAverage?: number;
  classProgress?: number;
}

export interface Student {
  ID?: number;
  name: string;
  email?: string;
}

export interface AssignmentGroup {
  ID?: number;
  classId: number;
  title: string;
  weight: number;
  token?: string;
}

export interface AssignmentItem {
  ID?: number;
  assignmentId?: number;
  label: string;
  weight: number;
  questions?: number;
  overallWeight?: number;
  groupWeight?: number;
  groupTitle?: string;
  average?: number;
  token?: string;
}

export interface Grade {
  gradeId: number;
  studentId: number;
  assignmentId: number;
  grade: number;
  questionsCorrect?: number;
  status?: string;
}

export interface GradeBookItem {
  studentDetails: Student;
  average: number;
  grades: Grade[];
}

export interface ClassDetails {
  ID: number;
  classData: Class;
  roster: Student[];
  assignments: AssignmentItem[];
  grades: Grade[];
}

export interface Response {
  response: any;
}
