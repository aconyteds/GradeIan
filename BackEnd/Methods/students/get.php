<?php
  require "../authenticate.php";

  if($userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $classId = getParameters(["classId"])->classId;
    if(!!$classId){
      //Get the students for a single class
      $students = $conn->query("call getStudent('$classId')")->fetchAll(PDO::FETCH_OBJ);
      echo json_encode($students);
    }
    else{
      $searchTerm = getParameters(["searchTerm"])->searchTerm;
      //This will be a student Search
      $students = $conn->query("call getStudent('$searchTerm')")->fetchAll(PDO::FETCH_OBJ);
      if(!$students){
        $students=[];
      }

      echo json_encode($students);
    }
  }
?>
