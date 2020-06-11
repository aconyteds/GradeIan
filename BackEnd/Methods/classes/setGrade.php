<?php
  require "../authenticate.php";
  //Authentication successful
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $inputs = getParameters(["grade", "grades"]);
    $response = new stdClass();
    if($inputs->grades){
      //Saving multiple grades
      $errors = true;
      foreach($inputs->grades as $grade){
        $errors = $errors && $conn->query("call setGrade($grade->studentId, $grade->assignmentId, $grade->grade, $grade->questionsCorrect)")->fetch(PDO::FETCH_OBJ)->response;
      }
      $response->response = $errors;
    }
    else if ($inputs->grade){
      $grade = $inputs->grade;
      $response->response = $conn->query("call setGrade($grade->studentId, $grade->assignmentId, $grade->grade, $grade->questionsCorrect)")->fetch(PDO::FETCH_OBJ)->response;
    }
    else{
      $response->response = false;
    }
    echo json_encode($response);
    $conn=null;
  }
?>
