<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["groupId"]);

  if ($userId) {
    if($inputs->groupId) {
      $response = $conn->query("call getGroupUsers($userId, $inputs->groupId)")->fetchAll(PDO::FETCH_OBJ);
    } else {
      $response = $conn->query("call getGroupUsers($userId, null)")->fetchAll(PDO::FETCH_OBJ);
    }

    echo json_encode($response);
  } else {
    $response = "0";
    echo json_encode($response);
  }
  $conn=null;
 ?>
