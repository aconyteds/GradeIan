<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $inputs = getParameters(["assignmentId", "label", "questions", "weight"]);
    $assignmentId = $inputs->assignmentId;
    $label = $inputs->label;
    $questions = $inputs->questions;
    $weight = $inputs->weight;
    try{
      //Create a new assignment item with all details
      $assignmentId = $conn->query("call createAssignmentItem($assignmentId, '$label', '$questions', $weight)")->fetch(PDO::FETCH_OBJ);

      echo json_encode($assignmentId);
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
