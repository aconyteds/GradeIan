<?php
  require "../authenticate.php";

  if($userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $classId = getParameters(["classId"])->classId;
    //Explode converts the submission to an array for usage
    $students = explode(",", getParameters(["students"])->students);
    try{
      $enrollResponses->response = [];
      foreach($students as $id){
        // Send a request for each student to be enrolled in the class
        $queryResponse = $conn->query("call enrollStudent('$classId','$id')")->fetch(PDO::FETCH_OBJ);
        $response = new stdClass();
        $response->successful = $queryResponse->response;
        $response->ID = $id;

        array_push($enrollResponses->response, $response);
      }
      echo json_encode($enrollResponses);
    } catch(PDOException $err){
      echo $err;
    }
    $conn=null;
  }
?>
