import {Class} from "../../interfaces";

export class ClassModel implements Class{
  constructor(
    public classTitle:string,
    public classIcon:string,
    public startDate:string,
    public endDate:string,
    public token:string
  ){
  }
}
