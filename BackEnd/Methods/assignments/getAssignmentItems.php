<?php
  require "../authenticate.php";

  if($userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $groupId = getParameters(["groupId"])->groupId;
    if(!!$groupId){
      //Get the students for a single class
      $assignments = $conn->query("call getAssignmentItems($groupId)")->fetchAll(PDO::FETCH_OBJ);
      echo json_encode($assignments);
    }
    else{
      echo json_encode([]);
    }
  }
?>
