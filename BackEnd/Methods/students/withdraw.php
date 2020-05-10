<?php
  require "../authenticate.php";

  if($userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $classId = getParameters(["classId"])->classId;
    $studentId = getParameters(["studentId"])->studentId;
    //This will be a student Search
    $response = $conn->query("call withdrawStudent('$classId','$studentId')")->fetch(PDO::FETCH_OBJ);

    echo json_encode($response);
  }
?>
