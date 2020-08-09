<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";
  $groupName = getParameters(["groupName"])->groupName;

  if($userId) {
    $response = $conn->query("call checkGroupName('$groupName')")->fetch(PDO::FETCH_OBJ);
  } else {
    $response = "0";
  }

  echo json_encode($response);

  $conn=null;
 ?>
