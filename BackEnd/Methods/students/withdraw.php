<?php
  require "../authenticate.php";

  if($userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $classId = getParameters(["classId"])->classId;
    //Explode converts the submission to an array for usage
    $students = explode(",", getParameters(["students"])->students);
    try{
      $withdrawResponses->response = [];
      foreach($students as $id){
        // Send a request for each student to be enrolled in the class
        $queryResponse = $conn->query("call withdrawStudent($classId,$id)")->fetch(PDO::FETCH_OBJ);
        $response = new stdClass();
        $response->successful = $queryResponse->response;
        $response->ID = $id;

        array_push($withdrawResponses->response, $response);
      }
      echo json_encode($withdrawResponses->response);
    } catch(PDOException $err){
      echo $err;
    }
    $conn=null;
  }
?>
