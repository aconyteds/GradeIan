import {Login} from "../../interfaces";

export class LoginModel implements Login{
  constructor(
    public userName:string,
    public password:string
  ){
  }
}
