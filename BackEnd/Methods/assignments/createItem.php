<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $assignments = getParameters(["assignments"])->assignments;
    try{
      $currResponse = new stdClass();
      $currResponse->itemIds = [];
      if(count($assignments) > 0){

        foreach($assignments as $assignment){
          $assignmentId = $assignment->assignmentId;
          $label = $assignment->label;
          $questions = $assignment->questions;
          $weight = $assignment->weight;
          //Create a new assignment item with all details
          $itemId = $conn->query("call createAssignmentItem($assignmentId, '$label', $questions, $weight)")->fetch(PDO::FETCH_OBJ);

          array_push($currResponse->itemIds, $itemId);
        }
      }
      echo json_encode($currResponse);
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
