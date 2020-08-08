<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["groupId"]);

  if ($userId) {
    $siteAdmin = $conn->query("call checkYourSiteAdminPrivelege($userId)")->fetch(PDO::FETCH_OBJ)->response;
    if($siteAdmin && $inputs->groupId) {
      $response = $conn->query("call getUsersByGroup($userId, $inputs->groupId)")->fetchAll(PDO::FETCH_OBJ);
    } else {
      $response = $conn->query("call getGroupUsers($userId)")->fetchAll(PDO::FETCH_OBJ);
    }

    echo json_encode($response);
  } else {
    $response = "0";
    echo json_encode($response);
  }
  $conn=null;
 ?>
