<?php
  require realpath(__DIR__."./getParameters.php");
  require realpath(__DIR__."./dbConnect.php");
  require realpath(__DIR__."./getUserIP.php");

  $token = getParameters(["token"])->token;
  if($token){
    $userId = $conn->query("call authenticate('$token', '$user_ip')")->fetch(PDO::FETCH_OBJ)->UserID;
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
