<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";

  if ($userId) {
    $response = new stdClass();
    $response->siteAdmin = $conn->query("call checkYourSiteAdminPrivelege($userId)")->fetch(PDO::FETCH_OBJ)->response;
    $response->groupAdmin = $conn->query("call checkYourAdminPrivelege($userId)")->fetch(PDO::FETCH_OBJ)->response;

    echo json_encode($response);
  } else {
    $response = "0";
    echo json_encode($response);
  }
  $conn=null;
 ?>
