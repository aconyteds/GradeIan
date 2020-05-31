<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $inputs = getParameters(["classId", "title", "defaultName", "weight"]);
    $classId = $inputs->classId;
    $title = $inputs->title;
    $defaultLabel = $inputs->defaultName;
    $weight = $inputs->weight;
    try{
      //Create a new assignment group with all details
      $assignmentId = $conn->query("call createAssignment($classId, '$title', '$defaultLabel', $weight)")->fetch(PDO::FETCH_OBJ);

      echo json_encode($assignmentId);
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
