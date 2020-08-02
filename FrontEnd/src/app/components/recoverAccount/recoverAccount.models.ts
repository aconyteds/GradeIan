export interface RecoverAccount {
  userId?: number;
  userName?: string;
  userEmail?: string;
  securityQuestion?: string;
  securityAnswer?: string;
  password?: string;
}

export class RecoverAccountModel implements RecoverAccount {
  constructor(
    public userId?: number,
    public userName?: string,
    public userEmail?: string,
    public securityQuestion?: string,
    public securityAnswer?: string,
    public password?: string
  ) {}
}
