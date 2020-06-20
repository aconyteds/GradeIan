<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $assignments = getParameters(["assignments"])->assignments;
    try{
      $responseObj = new stdClass();
      $responseObj->response = true;
      if(count($assignments) > 0){

        foreach($assignments as $assignment){
          //Update an assignment item with all details
          $currResponse = $conn->query("call updateAssignmentGroup($assignment->ID, '$assignment->title', $assignment->weight)")->fetch(PDO::FETCH_OBJ)->response;
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
