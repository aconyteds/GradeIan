export interface User {
  firstName: string;
  lastName: string;
  email: string;
  securityQuestion: number;
  securityAnswer: string;
  userName: string;
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
  email: string;
}

export interface AssignmentGroup {
  ID?: number;
  classId: number;
  title: string;
  weight: number;
}

export interface AssignmentItem {
  ID?: number;
  assignmentId?: number;
  label: string;
  questions: number;
  weight: number;
}

export interface Response {
  response: any;
}
