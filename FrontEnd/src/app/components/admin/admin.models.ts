import { Groups } from "../groups/groups.models";

export interface GroupLicenseDetails {
  licenseLabel: string;
  licenseString: string;
  userName?: string;
  email?: string;
}

export interface AccessLevels {
  accessId: number;
  accessLabel: string;
}

export class UserGroupModel implements Groups {
  constructor(
    public groupId: number,
    public groupName: string,
    public userCount?: number,
    public studentCount?: number,
    public licenseCount?: number
  ) {}
}

export class GroupLicenseDetailsModel implements GroupLicenseDetails {
  constructor(
    public licenseLabel: string,
    public licenseString: string,
    public userName?: string,
    public email?: string
  ) {}
}

export class AccessLevelsModel implements AccessLevels {
  constructor(
    public accessId: number,
    public accessLabel: string
  ) {}
}
