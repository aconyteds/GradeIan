const baseUrl:string ="//localhost/gradeIan";

export class AccountUrls {
  public checkUserName:string = baseUrl + "/account/checkUserName.php";
  public checkEmail:string = baseUrl + "/account/checkEmail.php";
  public getSecurityQuestions:string = baseUrl+"/account/getSecurityQuestions.php";
  public createAccount:string = baseUrl+"/account/create.php";

  public getUserDetails:string = baseUrl+"/account/getUserDetails.php";
}

export class AuthenticationUrls {
  public login:string = baseUrl+"/account/login.php";
}

export class ClassesUrls{
  public createClass:string = baseUrl + "/class/create.php";
}

//Icons available for selection for classes
export const classIcons:string[] = [
  "fa-anchor",
  "fa-archive",
  "fa-asterisk",
  "fa-automobile",
  "fa-balance-scale",
  "fa-bank",
  "fa-bed",
  "fa-beer",
  "fa-bell",
  "fa-bicycle",
  "fa-binoculars",
  "fa-bolt",
  "fa-bomb",
  "fa-book",
  "fa-bookmark",
  "fa-briefcase",
  "fa-bug",
  "fa-calculator",
  "fa-calendar",
  "fa-camera-retro",
  "fa-certificate",
  "fa-clock",
  "fa-coffee",
  "fa-comment",
  "fa-dashboard",
  "fa-desktop",
  "fa-gamepad",
  "fa-gavel",
  "fa-group",
  "fa-heartbeat",
  "fa-key",
  "fa-leaf",
  "fa-magic",
  "fa-map-signs",
  "fa-money",
  "fa-paw",
  "fa-plug",
  "fa-star",
  "fa-sticky-note",
  "fa-tag",
  "fa-transgender",
  "fa-trash",
  "fa-tree",
  "fa-trophy"
];
