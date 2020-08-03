<?php
  require "../authenticate.php";
  require "../dbConnect.php";

  if($userId){
    //userId should now only come from the server

    $response = $conn->query("call getAccountDetails($userId)")->fetch(PDO::FETCH_OBJ);

    echo json_encode($response);
  }
  else{
    echo json_encode(new stdClass());
  }
 ?>
