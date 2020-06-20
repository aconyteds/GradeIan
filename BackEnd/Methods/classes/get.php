<?php
  require "../authenticate.php";
  //Authentication successful
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $classId = getParameters(["classId"])->classId;
    if(!!$classId){
      $classDetails = new stdClass();
      //Get the details for a single class
      $class = $conn->query("call getClass($classId)")->fetch(PDO::FETCH_OBJ);
      if($class){
        $classDetails->response = true;
        $classDetails->ID = $classId;
        $classDetails->classData= $class;
        $students = $conn->query("call getStudents($classId)")->fetchAll(PDO::FETCH_OBJ);
        $classDetails->roster=$students;
        $assignments = $conn->query("call getAssignments($classId)")->fetchAll(PDO::FETCH_OBJ);
        $classDetails->assignments = $assignments;
        $classDetails->grades = [];
        $totalWeight = 0;
        $groups = [];
        foreach($assignments as $assignment){
          if(!array_search($assignment->groupId, $groups)){
            $totalWeight += $assignment->groupWeight;
            array_push($groups, $assignment->groupId);
          }
          $currGrades = $conn->query("call getAssignmentGrades($assignment->ID)")->fetchAll(PDO::FETCH_OBJ);
          if(count($currGrades) > 0){
            $classDetails->grades = array_merge($classDetails->grades, $currGrades);
          }
        }
        $classDetails->totalWeight = $totalWeight;
        foreach($assignments as $assignment){
          $assignment->overallWeight = round((($assignment->groupWeight/$totalWeight)*($assignment->weight/$totalWeight)) * $totalWeight, 2);
        }
      }
      else{
        $classDetails->response = false;
      }
      echo json_encode($classDetails);
    }
    else{
      $classes = $conn->query("call getClasses('$userId')")->fetchAll(PDO::FETCH_OBJ);
      if(!!$classes){
        foreach ($classes as $i => $class) {
          //Get the number of students for each class
          $studentCount = $conn->query("call getStudentCount($class->classId)")->fetch(PDO::FETCH_OBJ)->students;
          if(!$studentCount){
            $studentCount=0;
          }
          $classes[$i]->students = (INT)$studentCount;
          $classes[$i]->classProgress = 0;
          $classes[$i]->classAverage = 0;

          if($studentCount > 0){
            //Get the progress of each Class
            $grades = [];
            $totalWeight = 0;
            $groups = [];
            $students = $conn->query("call getStudents($class->classId)")->fetchAll(PDO::FETCH_OBJ);
            $assignments = $conn->query("call getAssignments($class->classId)")->fetchAll(PDO::FETCH_OBJ);
            if($assignments > 0){
              if($students > 0 && count($assignments > 0)){}
              foreach($assignments as $assignment){
                if(!array_search($assignment->groupId, $groups)){
                  $totalWeight += $assignment->groupWeight;
                  array_push($groups, $assignment->groupId);
                }
                $currGrades = $conn->query("call getAssignmentGrades($assignment->ID)")->fetchAll(PDO::FETCH_OBJ);
                if(count($currGrades) > 0){
                  $grades = array_merge($grades, $currGrades);
                }
              }

              $progress = 0;
              $classAverage = 0;
              foreach($students as $student){
                $studentAverage = 0;
                $studentProgress = 0;
                $totalStudentWeight = 0;
                foreach ($grades as $grade) {
                  if($grade->studentId == $student->ID){
                    foreach($assignments as $assignment){
                      if($grade->assignmentId == $assignment->ID){
                        $assignmentWeight = (($assignment->groupWeight / $totalWeight) * ($assignment->weight / $totalWeight)) ;
                        $studentAverage += $grade->grade * $assignmentWeight;
                        $studentProgress += $assignmentWeight * $totalWeight;
                        break;
                      }
                    }
                  }
                }
                if ($studentProgress > 0) {
                  $classAverage += ($studentAverage / $studentProgress) * $totalWeight;
                  if ($studentProgress > $progress) {
                    $progress = $studentProgress;
                  }
                }

              }

              if($totalWeight != 0) {
                $classes[$i]->classProgress = round(($progress / $totalWeight) * $totalWeight, 0);
              }

              //Get the class Average
              if($progress != 0) {
                $classes[$i]->classAverage = round($classAverage / $studentCount , 2);
              }
            }
          }
        }
      }
      else{
        $classes=[];
      }

      echo json_encode(array("classes"=>$classes));
    }
  }
?>
