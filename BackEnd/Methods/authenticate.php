<?php
  require realpath(__DIR__."./getParameters.php");
  require realpath(__DIR__."./dbConnect.php");

  $token = getParameters(["token"])->token;
  if($token){
    $userId = $conn->query("call authenticate('$token')")->fetch(PDO::FETCH_OBJ)->UserId;
    if(!$userId){
      http_response_code(401);
    }
    else{
      //echo json_encode(array("userId"=>$UserId));
    }
  }
  else{
    http_response_code(401);
  }
 ?>
