<?php
  require "../authenticate.php";
  //Authentication successful
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $classId = getParameters(["classId"])->classId;
    if(!!$classId){
      //Get the details for a single class
    }
    else{
      $classes = $conn->query("call getClasses('$userId')")->fetchAll(PDO::FETCH_OBJ);
      if(!!$classes){
        foreach ($classes as $i => $class) {
          //Get the number of students for each class
          $students = $conn->query("call getStudentCount('$class->classId')")->students;
          if(!$students){
            $students=0;
          }
          $classes[$i]->students = (INT)$students;

          //Get the progress of each Class
          $classes[$i]->classProgress = 0;

          //Get the class Average
          $classes[$i]->classAverage = 0;

        }
      }
      else{
        $classes=[];
      }

      echo json_encode(array("classes"=>$classes));
    }
  }
?>
