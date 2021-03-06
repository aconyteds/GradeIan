import { environment } from "../environments/environment";
const baseUrl = environment.apiUrl;

export class AccountUrls {
  public checkUserName: string = baseUrl + "/account/checkUserName.php";
  public checkEmail: string = baseUrl + "/account/checkEmail.php";
  public getSecurityQuestions: string = baseUrl + "/account/getSecurityQuestions.php";
  public createAccount: string = baseUrl + "/account/create.php";
  public getUserDetails: string = baseUrl + "/account/getUserDetails.php";
  public getSecurityQuestion: string = baseUrl + "/account/getSecurityQuestion.php";
  public recoverAccount: string = baseUrl + "/account/recoverAccount.php";
  public updateUserAccount: string = baseUrl + "/account/updateUserAccount.php";
  public updateUserPassword: string = baseUrl + "/account/updateUserPassword.php";
}

export class AuthenticationUrls {
  public login: string = baseUrl + "/account/login.php";
  public checkYourPrivelege: string = baseUrl + "/account/checkYourPrivelege.php";
  public getUserDetails: string = baseUrl + "/account/getUserDetails.php";
}

export class ClassesUrls {
  public createClass: string = baseUrl + "/classes/create.php";
  public getClass: string = baseUrl + "/classes/get.php";
  public getAssignmentGrades: string = baseUrl + "/classes/getAssignmentGrades.php";
  public setGrade: string = baseUrl + "/classes/setGrade.php";
  public updateClass: string = baseUrl + "/classes/update.php";
  public deleteClass: string = baseUrl + "/classes/delete.php";
}

export class StudentUrls {
  public createStudents: string = baseUrl + "/students/create.php";
  public checkStudentEmail: string = baseUrl + "/students/checkStudentEmail.php";
  public enrollStudents: string = baseUrl + "/students/enroll.php";
  public getStudents: string = baseUrl + "/students/get.php";
  public withdrawStudents: string = baseUrl + "/students/withdraw.php";
}

export class AssignmentUrls {
  public createAssignment: string = baseUrl + "/assignments/create.php";
  public createAssignmentGroup: string = baseUrl + "/assignments/createAssignmentGroup.php";
  public createAssignmentItem: string = baseUrl + "/assignments/createItem.php";
  public getAssignments: string = baseUrl + "/assignments/get.php";
  public getAssignmentItems: string = baseUrl + "/assignments/getAssignmentItems.php";
  public updateAssignmentGroup: string = baseUrl + "/assignments/updateAssignmentGroup.php";
  public updateAssignmentItem: string = baseUrl + "/assignments/updateAssignmentItem.php";
  public deleteAssignmentGroup: string = baseUrl + "/assignments/deleteAssignmentGroup.php";
  public deleteAssignmentItem: string = baseUrl + "/assignments/deleteAssignmentItem.php";
}

export class GroupsUrls {
  public getGroupUsers: string = baseUrl + "/admin/getGroupUsers.php";
  public getGroupStudents: string = baseUrl + "/admin/getGroupStudents.php";
  public unlockAccount: string = baseUrl + "/admin/unlockAccount.php";
  public setStudentStatus: string = baseUrl + "/admin/setStudentStatus.php";
  public getGroups: string = baseUrl + "/admin/getGroups.php";
  public getGroupsDetails: string = baseUrl + "/admin/getGroupsDetails.php";
  public getGroupLicenseDetails: string = baseUrl + "/admin/getGroupLicenseDetails.php";
  public checkGroupName: string = baseUrl + "/admin/checkGroupName.php";
  public createGroup: string = baseUrl + "/admin/createGroup.php";
  public getAccessLevels: string = baseUrl + "/admin/getAccessLevels.php";
  public createLicense: string = baseUrl + "/admin/createLicense.php";
}

// Icons available for selection for classes
export const classIcons: string[] = [
  "fa fa-anchor",
  "fa fa-archive",
  "fa fa-asterisk",
  "fas fa-car",
  "fa fa-balance-scale",
  "fas fa-university",
  "fa fa-bed",
  "fa fa-beer",
  "fa fa-bell",
  "fa fa-bicycle",
  "fa fa-binoculars",
  "fa fa-bolt",
  "fa fa-bomb",
  "fa fa-book",
  "fa fa-bookmark",
  "fa fa-briefcase",
  "fa fa-bug",
  "fa fa-calculator",
  "fa fa-calendar",
  "fa fa-camera-retro",
  "fa fa-certificate",
  "fas fa-clock",
  "fa fa-coffee",
  "fa fa-comment",
  "fas fa-tachometer-alt",
  "fa fa-desktop",
  "fa fa-gamepad",
  "fa fa-gavel",
  "fas fa-users",
  "fa fa-heartbeat",
  "fa fa-key",
  "fa fa-leaf",
  "fa fa-magic",
  "fa fa-map-signs",
  "fas fa-money-bill",
  "fa fa-paw",
  "fa fa-plug",
  "fa fa-star",
  "fa fa-sticky-note",
  "fa fa-tag",
  "fa fa-transgender",
  "fa fa-trash",
  "fa fa-tree",
  "fa fa-trophy",
  "fas fa-tooth"
];
