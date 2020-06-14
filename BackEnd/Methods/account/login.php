<?php
  require "../dbConnect.php";
  require_once "../getParameters.php";
  $inputs = getParameters(["userName", "password"]);

  $response = $conn->query("call login('$inputs->userName', '$inputs->password')")->fetch(PDO::FETCH_OBJ);
  $state = $response->response;
  if($state == -2 || $state == -1 || $state == 0 || $state == null){
    echo json_encode(Array("token"=>$state));
  }
  else{
    //Success!
    $token = $conn->query("call generateToken('$state')")->fetch(PDO::FETCH_OBJ);

    echo json_encode(Array("token" => $token->response));
  }
  $conn=null;
 ?>
