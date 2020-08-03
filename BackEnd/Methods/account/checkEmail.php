<?php
  require "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["email", "userId"]);

  if($inputs->userId) {
    $response = $conn->query("call checkEmail('$inputs->email', $inputs->userId)")->fetch(PDO::FETCH_OBJ);
  } else {
    $response = $conn->query("call checkEmail('$inputs->email', null)")->fetch(PDO::FETCH_OBJ);
  }

  echo json_encode($response);

  $conn=null;
 ?>
