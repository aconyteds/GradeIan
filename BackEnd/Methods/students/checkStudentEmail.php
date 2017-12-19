<?php
  require "../authenticate.php";
  if(!!$userId){
    require_once "../dbConnect.php";
    require_once "../getParameters.php";
    $inputs = getParameters(["email"]);
    $email = $inputs->email;
    try{
      $response = $conn->query("call checkStudentEmail('$email')")->fetch(PDO::FETCH_OBJ)->response;
      echo json_encode(array("response"=>(INT)$response));
    }catch(PDOException $err){
      echo $err;
    }
    $conn = null;
  }
?>
