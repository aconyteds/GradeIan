<?php
  require_once "../dbConnect.php";
  require_once "../getParameters.php";


  $inputs = getParameters(["userId", "password", "newPassword"]);

  $response = $conn->query("call updateUserPassword($inputs->userId, '$inputs->password', '$inputs->newPassword')")->fetch(PDO::FETCH_OBJ);

  echo json_encode($response);
 ?>
