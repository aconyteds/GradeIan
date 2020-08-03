import { User } from "../../interfaces";

export class UpdateUserModel implements User {
  public token!: string;
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public securityQuestion: number,
    public securityAnswer: string
  ) {}
}

export class UpdatePasswordModel implements User {
  constructor(
    public userId: number,
    public password?: string,
    public newPassword?: string
  ) {}
}
