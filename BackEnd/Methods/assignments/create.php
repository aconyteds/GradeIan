<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $inputs = getParameters(["assignments"]);
    $assignments = $inputs->assignments;
    try{
      $createResponse = new stdClass();
      $createResponse->response = [];
      foreach($assignments as $group){
        $assignment = $group->assignment;
        //Create a new assignment group with all details
        $assignmentId = $conn->query("call createAssignment($assignment->classId, '$assignment->title', $assignment->weight)")->fetch(PDO::FETCH_OBJ)->response;
        $currResponse = new stdClass();
        $currResponse->assignmentId = $assignmentId;
        $currResponse->itemIds = [];
        foreach($group->assignmentItems as $item){
          //Create a new assignment item with all details
          $itemId = $conn->query("call createAssignmentItem($assignmentId, '$item->label', $item->questions, $item->weight)")->fetch(PDO::FETCH_OBJ)->response;
          array_push($currResponse->itemIds, $itemId);
        }
        array_push($createResponse->response, $currResponse);
      }
      echo json_encode($createResponse);
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
