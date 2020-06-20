<?php
  require "../authenticate.php";

  if($userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $classId = getParameters(["classId"])->classId;
    if(!!$classId){
      //Get the students for a single class
      $assignments = $conn->query("call getAssignments($classId)")->fetchAll(PDO::FETCH_OBJ);
      echo json_encode($assignments);
    }
    else{
      echo json_encode([]);
    }
  }
?>
