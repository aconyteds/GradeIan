<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $inputs = getParameters(["classId"]);
    $classId = $inputs->classId;
    try{
      $class = $conn->query("call getClass($classId)")->fetch(PDO::FETCH_OBJ);
      if($class->teacherId == $userId){
        // Class found and this is the currently authenticated teacher's class
        $response = $conn->query("call deleteClass($classId)")->fetch(PDO::FETCH_OBJ)->response;
      } else {
        $response = false;
      }

      echo json_encode($response);
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
