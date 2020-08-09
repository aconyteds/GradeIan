<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["groupId", "accessLevel"]);

  if($userId) {
    $groupAdmin = $conn->query("call checkYourAdminPrivelege($userId)")->fetch(PDO::FETCH_OBJ)->response;
    $siteAdmin = $conn->query("call checkYourSiteAdminPrivelege($userId)")->fetch(PDO::FETCH_OBJ)->response;
    if($groupAdmin || $siteAdmin) {
      $response = $conn->query("call createLicense($inputs->accessLevel, $inputs->groupId)")->fetch(PDO::FETCH_OBJ)->License;
    } else {
      $response = "0";
    }

  } else {
    $response = "0";
  }

  echo json_encode($response);

  $conn=null;
 ?>
