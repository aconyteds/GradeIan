import {Student} from "../../interfaces";

export class StudentModel implements Student{
  constructor(
    public name:string,
    public email:string
  ){
  }
}
