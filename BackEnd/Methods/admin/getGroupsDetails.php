<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";

  if ($userId) {
    $groups = $conn->query("call getGroupsDetails($userId)")->fetchAll(PDO::FETCH_OBJ);

    if(!$groups) {
      $groups = [];
    }

    echo json_encode($groups);
  } else {
    $response = "0";
    echo json_encode($response);
  }
  $conn=null;
 ?>
