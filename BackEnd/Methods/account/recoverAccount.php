<?php
  require "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["userId", "securityAnswer", "password"]);

  $response = $conn->query("call recoverUserPassword($inputs->userId, '$inputs->securityAnswer', '$inputs->password')")->fetch(PDO::FETCH_OBJ);

  echo json_encode($response);
  $conn=null;
?>
