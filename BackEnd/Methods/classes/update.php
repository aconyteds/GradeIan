<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $classDetails = getParameters(["classDetails"])->classDetails;
    try{
      //Create a new Class with all details
      $response = $conn->query("call updateClass($classDetails->classId, '$classDetails->classTitle', '$classDetails->classIcon', '$classDetails->startDate', '$classDetails->endDate', $classDetails->minPassing)")->fetch(PDO::FETCH_OBJ);

      echo json_encode($response);
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
