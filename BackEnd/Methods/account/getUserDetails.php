<?php
  require "../dbConnect.php";

  if($_GET["id"]){
    //handle GET requests
    $id = $_GET["id"];
  }
  else if($_POST["id"]){
    //Handle POST requests
    $id = $_POST["id"];
  }
  else{
    //Handle payload delivery
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $id = $data->id;
  }

  if($id){
    //Protect us from fucking SQL injections, go fuck yourself hackers
    $id = explode(";", $id)[0];

    $response = $conn->query("SELECT FirstName, LastName, email FROM Users WHERE ID = $id;")->fetch(PDO::FETCH_OBJ);

    echo json_encode($response);
  }
  else{
    echo json_encode("{}");
  }

  $conn=null;
 ?>
