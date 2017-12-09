<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $inputs = getParameters(["classTitle", "classIcon", "startDate", "endDate"]);
    $classTitle = $inputs->classTitle;
    $classIcon = $inputs->classIcon;
    $startDate = $inputs->startDate;
    $endDate = $inputs->endDate;
    try{
      //Create a new Class with all details
      $classId = $conn->query("call createClass('$classTitle', '$classIcon', $userId, '$startDate', '$endDate')")->fetch(PDO::FETCH_OBJ)->ID;

      echo json_encode(array("classId"=>(INT)$classId));
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
