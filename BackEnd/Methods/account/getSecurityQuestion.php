<?php
  require "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["userName", "userEmail"]);

  $response = $conn->query("call getSecurityQuestion('$inputs->userName', '$inputs->userEmail')")->fetch(PDO::FETCH_OBJ);

  if(!!$response->userId){
    $accountDetails = new stdClass();

    $accountDetails->response = true;
    $accountDetails->userId = $response->userId;
    $accountDetails->question = $response->securityQuestion;
    $accountDetails->userName = $response->userName;

    echo json_encode($accountDetails);
  } else {
    echo json_encode($response);
  }
  $conn=null;
?>
