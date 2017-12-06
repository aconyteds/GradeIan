export interface User{
  firstName:string;
  lastName:string;
  email:string;
  securityQuestion:number;
  securityAnswer:string;
  userName:string;
  password?:string;
}

export interface NewAccount{
  newUserID:string;
}

export interface SecurityQuestion{
  ID:number;
  Question:string;
}

export interface Login{
  userName:string;
  password:string;
}

export interface Credential{
  token:string;
}

export interface Class{
  classId?:number;
  classTitle:string;
  classIcon?:string;
  startDate?:Date;
  endDate?:Date;
  teacherId?:string;
}
