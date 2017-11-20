<?php
  require "../dbConnect.php";

  $email = $_GET["email"];

  $response = $conn->query("call checkEmail('$email')")->fetch(PDO::FETCH_OBJ);

  echo json_encode($response);

  $conn=null;
 ?>
