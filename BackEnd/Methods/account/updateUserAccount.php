<?php
  require "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";

  if($userId){
    //userId should now only come from the server
    $inputs = getParameters(["firstName", "lastName", "email", "securityQuestion", "securityAnswer"]);

    $response = $conn->query("call updateAccount($userId, '$inputs->firstName', '$inputs->lastName', '$inputs->email', '$inputs->securityAnswer', $inputs->securityQuestion)")->fetch(PDO::FETCH_OBJ);

    echo json_encode($response);
  }
  else{
    $response = "0";
    echo json_encode($response);
  }
 ?>
