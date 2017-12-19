<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $inputs = getParameters(["students"]);
    try{
      $students = [];
      foreach($inputs->students as $student){
        $studentName = $student->name;
        $studentEmail= $student->email;
        //Create a new Student with the details
        //Student ID is returned as part of the creation
        $studentId = $conn->query("call createStudent($userId, '$studentName', '$studentEmail')")->fetch(PDO::FETCH_OBJ)->ID;
        array_push($students, (INT)$studentId);
      }
      echo json_encode(array("students"=>$students));
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
