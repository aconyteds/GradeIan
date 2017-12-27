<?php
  require "../authenticate.php";

  if($userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $classId = getParameters(["classId"])->classId;
    if(!!$classId){
      //Get the students for a single class
    }
    else{
      $searchTerm = getParameters(["searchTerm"])->searchTerm;
      //This will be a student Search
      $students = $conn->query("call getStudent('$searchTerm')")->fetchAll(PDO::FETCH_OBJ);
      if(!$students){
        $students=[];
      }

      echo json_encode(array("results"=>$students));
    }
  }
?>
