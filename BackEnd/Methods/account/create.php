<?php
  require "../dbConnect.php";



  if($_GET["userName"]){
    //handle GET requests
    $firstName = $_GET["firstName"];
    $lastName = $_GET["lastName"];
    $email = $_GET["email"];
    $securityQuestion = $_GET["securityQuestion"];
    $securityAnswer = $_GET["securityAnswer"];
    $userName = $_GET["userName"];
    $userPassword = $_GET["password"];
  }
  else if($_POST["userName"]){
    //Handle POST requests
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $email = $_POST["email"];
    $securityQuestion = $_POST["securityQuestion"];
    $securityAnswer = $_POST["securityAnswer"];
    $userName = $_POST["userName"];
    $userPassword = $_POST["password"];
  }
  else{
    //Handle payload delivery
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $firstName = $data->firstName;
    $lastName = $data->lastName;
    $email = $data->email;
    $securityQuestion = $data->securityQuestion;
    $securityAnswer = $data->securityAnswer;
    $userName = $data->userName;
    $userPassword = $data->password;

  }


  try{
    //Check for unique username
    $uniqueUserName = $conn->query("call checkUserName('$userName')")->fetch(PDO::FETCH_OBJ);
    if(!!$uniqueUserName->response){
      echo "Account already exists for " . $userName . ".";
      return;
    }

    //Check for unique email
    $uniqueEmail = $conn->query("call checkEmail('$email')")->fetch(PDO::FETCH_OBJ);
    if(!!$uniqueEmail->response){
      echo "Account already esists for " . $email . ".";
      return;
    }

    // Commence with creation of account
    $response  = $conn->query("call createAccount('$firstName', '$lastName', '$email', '$securityAnswer', $securityQuestion, '$userName', '$userPassword')")->fetch(PDO::FETCH_OBJ);
    echo json_encode($response);

  }catch(PDOException $err){
    echo $err;
  }
  $conn = null;
?>
