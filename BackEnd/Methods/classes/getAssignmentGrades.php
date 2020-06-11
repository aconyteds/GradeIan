<?php
  require "../authenticate.php";
  //Authentication successful
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $assignments = getParameters(["assignments"])->assignments;
    $response = new stdClass();
    $response->grades = [];
    if(!!$assignments){
      foreach($assignments as $assignment){
        $currGrades = $conn->query("call getAssignmentGrades($assignment->ID)")->fetchAll(PDO::FETCH_OBJ);
        if(count($currGrades) > 0){
          $response->grades = array_merge($response->grades, $currGrades);
        }
      }
    }
    echo json_encode($response);
    $conn=null;
  }
?>
