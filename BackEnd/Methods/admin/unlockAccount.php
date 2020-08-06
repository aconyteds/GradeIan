<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["accountId"]);

  $response = new stdClass();
  if ($userId && $inputs->accountId) {
    $siteAdmin = $conn->query("call checkYourSiteAdminPrivelege($userId)")->fetch(PDO::FETCH_OBJ)->response;
    $groupAdmin = $conn->query("call checkYourAdminPrivelege($userId)")->fetch(PDO::FETCH_OBJ)->response;
    if($siteAdmin == "1" || $groupAdmin =="1") {
      $response->response = $conn->query("call unlockAccount($inputs->accountId)")->fetch(PDO::FETCH_OBJ)->response;
    } else {
      $response->respones = "0";
    }

    echo json_encode($response);
  } else {
    $response->response = "0";
    echo json_encode($response);
  }
  $conn=null;
 ?>
