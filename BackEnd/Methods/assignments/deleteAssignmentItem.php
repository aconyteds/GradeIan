<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $assignmentIds = getParameters(["assignmentIds"])->assignmentIds;
    try{
      $responseObj = new stdClass();
      $responseObj->response = true;
      if(count($assignmentIds) > 0){

        foreach($assignmentIds as $assignmentId){
          $currResponse = $conn->query("call deleteAssignmentItem($assignmentId)")->fetch(PDO::FETCH_OBJ)->response;
          if($responseObj->response && !$currResponse){
            // Error occured
            $responseObj->response = false;
          }
        }
      }
      echo json_encode($responseObj);
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
