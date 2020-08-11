<?php
  require "../getUserIP.php";
  require "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["userName", "password"]);

  $state = $conn->query("call login('$inputs->userName', '$inputs->password')")->fetch(PDO::FETCH_OBJ)->response;
  if($state == -2 || $state == -1 || $state == 0 || $state == null){
    echo json_encode(Array("token"=>$state));
  }
  else{
    //Success!
    $token = $conn->query("call generateToken($state, '$user_ip')")->fetch(PDO::FETCH_OBJ)->response;

    echo json_encode(Array("token" => $token));
  }
  $conn=null;
 ?>
