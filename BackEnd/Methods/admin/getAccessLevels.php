<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";

  if($userId) {
    $response = $conn->query("call getAccessLevels($userId)")->fetchAll(PDO::FETCH_OBJ);
  } else {
    $response = "0";
  }

  echo json_encode($response);

  $conn=null;
 ?>
