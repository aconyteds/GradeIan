var baseUrl ="//localhost/gradeIan";

export class AccountUrls {
  public checkUserName:string = baseUrl + "/account/checkUserName.php";
  public checkEmail:string = baseUrl + "/account/checkEmail.php";
  public getSecurityQuestions:string = baseUrl+"/account/getSecurityQuestions.php";
  public createAccount:string = baseUrl+"/account/create.php";
  public login:string = baseUrl+"/account/login.php";
}
