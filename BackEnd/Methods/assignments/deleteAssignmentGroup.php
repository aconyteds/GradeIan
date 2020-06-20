<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $groupIds = getParameters(["groupIds"])->groupIds;
    try{
      $responseObj = new stdClass();
      $responseObj->response = true;
      if(count($groupIds) > 0){

        foreach($groupIds as $groupId){
          $currResponse = $conn->query("call deleteAssignmentGroup($groupId)")->fetch(PDO::FETCH_OBJ)->response;
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
