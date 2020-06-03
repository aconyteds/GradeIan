<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $inputs = getParameters(["classIdId", "title", "weight"]);
    $classId = $inputs->classId;
    $title = $inputs->title;
    $weight = $inputs->weight;
    try{
      //Create a new assignment group with all details
      $assignmentId = $conn->query("call createAssignment($classId, '$title', $weight)")->fetch(PDO::FETCH_OBJ);

      echo json_encode($assignmentId);
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
