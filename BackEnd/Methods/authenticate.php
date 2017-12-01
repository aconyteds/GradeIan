<?php
  require "./dbConnect.php";
  require "./getParameters.php";

  $token = getParameters(["token"])->token;
  if($token){
    $UserId = $conn->query("call authenticate('$token')")->fetch(PDO::FETCH_OBJ)->UserId;
    if(!$UserId){
      http_response_code(401);
    }
    else{
      //echo json_encode(array("userId"=>$UserId));
    }
  }
  else{
    http_response_code(401);
  }
  $token=null;
  $conn=null;
 ?>
