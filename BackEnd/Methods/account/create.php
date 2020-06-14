<?php
  require "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["firstName", "lastName", "email", "securityQuestion", "securityAnswer", "userName", "password", "licenseKey"]);
  try{
    //Check for unique username
    $uniqueUserName = $conn->query("call checkUserName('$inputs->userName')")->fetch(PDO::FETCH_OBJ);
    if(!!$uniqueUserName->response){
      echo "Account already exists for " . $inputs->userName . ".";
      return;
    }

    //Check for unique email
    $uniqueEmail = $conn->query("call checkEmail('$inputs->email')")->fetch(PDO::FETCH_OBJ);
    if(!!$uniqueEmail->response){
      echo "Account already esists for " . $inputs->email . ".";
      return;
    }

    // Commence with creation of account
    $response  = $conn->query("call createAccount('$inputs->firstName', '$inputs->lastName', '$inputs->email', '$inputs->securityAnswer', $inputs->securityQuestion, '$inputs->userName', '$inputs->password', '$inputs->licenseKey')")->fetch(PDO::FETCH_OBJ);
    echo json_encode($response);

  }catch(PDOException $err){
    echo $err;
  }
  $conn = null;
?>
