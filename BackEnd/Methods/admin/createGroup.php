<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";
  $groupName = getParameters(["groupName"])->groupName;

  if($userId && $groupName) {
    $response = $conn->query("call createGroup($userId, '$groupName')")->fetch(PDO::FETCH_OBJ)->GroupID;
  } else {
    $response = "0";
  }

  echo json_encode($response);

  $conn=null;
 ?>
