export interface GroupUser {
  email: string;
  firstName: string;
  lastName: string;
  userID: number;
  userName: string;
  locked: boolean;
}

export class GroupUserModel implements GroupUser {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public userID: number,
    public userName: string,
    public locked: boolean
  ) {}
}
