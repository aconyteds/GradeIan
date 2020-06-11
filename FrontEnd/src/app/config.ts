const baseUrl = "//localhost/gradeIan";

export class AccountUrls {
  public checkUserName: string = baseUrl + "/account/checkUserName.php";
  public checkEmail: string = baseUrl + "/account/checkEmail.php";
  public getSecurityQuestions: string = baseUrl + "/account/getSecurityQuestions.php";
  public createAccount: string = baseUrl + "/account/create.php";

  public getUserDetails: string = baseUrl + "/account/getUserDetails.php";
}

export class AuthenticationUrls {
  public login: string = baseUrl + "/account/login.php";
}

export class ClassesUrls {
  public createClass: string = baseUrl + "/classes/create.php";
  public getClass: string = baseUrl + "/classes/get.php";
  public getAssignmentGrades: string = baseUrl + "/classes/getAssignmentGrades.php";
  public setGrade: string = baseUrl + "/classes/setGrade.php";
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
