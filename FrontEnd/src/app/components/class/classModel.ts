import {Class} from "../../interfaces";

export class ClassModel implements Class{
  constructor(
    public classTitle:string,
    public classIcon:string,
    public startDate:Date,
    public endDate:Date,
    public token:string
  ){
  }
}
