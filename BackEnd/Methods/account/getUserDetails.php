<?php
  require "../authenticate.php";
  require "../dbConnect.php";

  if($userId){
    //userId should now only come from the server
    $id = $userId;

    $response = $conn->query("SELECT FirstName, LastName, email FROM Users WHERE ID = $id;")->fetch(PDO::FETCH_OBJ);

    echo json_encode($response);
  }
  else{
    echo json_encode(new stdClass());
  }
 ?>
