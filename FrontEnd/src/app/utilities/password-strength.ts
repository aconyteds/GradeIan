// Object to check password strengths and various properties
export class PasswordCheckService {

  // Expected length of all passwords
  public static get MinimumLength(): number {
    return 8;
  }

  // Regex to check for a common password string - all based on 5+ length passwords
  private commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;

  //
  // Checks if the given password matches a set of common password
  //
  public isPasswordCommon(password: string): boolean {
    return this.commonPasswordPatterns.test(password);
  }

  //
  // Returns the strength of the current password
  //
  public checkPasswordStrength(password: string): number {
    let passwordStrength = 0;
    // Build up the strenth of our password
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
    numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)

    // Check then strenth of this password using some simple rules
    if (password === null || password.length < PasswordCheckService.MinimumLength) {
      passwordStrength=0;
    } else {
      passwordStrength= numberOfElements;
    }

    if (this.isPasswordCommon(password) === true) {
      passwordStrength--;
    }

    if(passwordStrength <0){
      passwordStrength = 0;
    } else if (passwordStrength >4){
      passwordStrength = 4;
    }

    // Return the strength of this password
    return passwordStrength;
  }
}