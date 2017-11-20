export interface User{
  firstName:string;
  lastName:string;
  email:string;
  securityQuestion:number;
  securityAnswer:string; 
  userName:string;
  password?:string;
}

export interface SecurityQuestion{
  ID:number;
  Question:string;
}
