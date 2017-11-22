<?php
  require "../dbConnect.php";

  if($_GET["userName"]){
    //handle GET requests
    $userName = $_GET["userName"];
    $userPassword = $_GET["password"];
  }
  else if($_POST["userName"]){
    //Handle POST requests
    $userName = $_POST["userName"];
    $userPassword = $_POST["password"];
  }
  else{
    //Handle payload delivery
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $userName = $data->userName;
    $userPassword = $data->password;
  }

  $response = $conn->query("call login('$userName', '$userPassword')")->fetch(PDO::FETCH_OBJ);
  $state = $response->response;
  if($state == -2 || $state == -1 || $state == 0 || $state == null){
    echo json_encode(Array("userId"=>$state));
  }
  else{
    //Success!
    $token = $conn->query("call generateToken('$state')")->fetch(PDO::FETCH_OBJ);

    echo json_encode(Array("userId" => $response->response, "token" => $token->response));
  }
  $conn=null;
 ?>
