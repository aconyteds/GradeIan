<?php
  require  "../authenticate.php";
  require_once "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["groupId"]);

  if ($userId) {
    $siteAdmin = $conn->query("call checkYourSiteAdminPrivelege($userId)")->fetch(PDO::FETCH_OBJ)->response;
    $groupAdmin = $conn->query("call checkYourAdminPrivelege($userId)")->fetch(PDO::FETCH_OBJ)->response;
    if ($inputs->groupId && $siteAdmin == "1") {
      $students = $conn->query("call getStudentsByGroup($userId, $inputs->groupId)")->fetchAll(PDO::FETCH_OBJ);
    } elseif ($siteAdmin == "1" || $groupAdmin == "1") {
      $students = $conn->query("call getStudentsByGroup($userId, null)")->fetchAll(PDO::FETCH_OBJ);
    }

    if(!$students) {
      $students = [];
    }

    echo json_encode($students);
  } else {
    $response = "0";
    echo json_encode($response);
  }
  $conn=null;
 ?>
