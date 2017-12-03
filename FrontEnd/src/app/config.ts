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
