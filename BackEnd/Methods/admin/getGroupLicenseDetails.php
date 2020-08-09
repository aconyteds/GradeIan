<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";
  $groupId = getParameters(["groupId"])->groupId;

  if ($userId && $groupId) {
    $response = $conn->query("call getGroupLicenses($userId, $groupId)")->fetchAll(PDO::FETCH_OBJ);


    if(!$response) {
      $response = "0";
    }

    echo json_encode($response);
  } else {
    $response = "0";
    echo json_encode($response);
  }
  $conn=null;
 ?>
