<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["studentId", "status"]);

  if ($userId) {
    $response = $conn->query("call changeStudentStatus($userId, $inputs->studentId, $inputs->status)")->fetch(PDO::FETCH_OBJ)->response;

    echo json_encode($response);
  } else {
    $response = "0";
    echo json_encode($response);
  }
  $conn=null;
 ?>
