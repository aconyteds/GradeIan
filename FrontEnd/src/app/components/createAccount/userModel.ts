import { User } from "../../interfaces";

export class UserModel implements User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public securityQuestion: number,
    public securityAnswer: string,
    public userName: string,
    public licenseKey: string,
    public password?: string
  ) {
  }
}
