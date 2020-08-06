export interface GroupUser {
  email: string;
  firstName: string;
  lastName: string;
  userID: number;
  userName: string;
  locked: boolean;
}

export interface GroupStudent {
  studentID: number;
  name: string;
  active: boolean;
  email?: string;
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

export class GroupStudentModel implements GroupStudent {
  constructor(
    public studentID: number,
    public name: string,
    public active: boolean,
    public email?: string
  ) {}
}
