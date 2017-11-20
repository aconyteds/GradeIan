<?php
  require "../dbConnect.php";

  $userName = $_GET["userName"];

  $response = $conn->query("call checkUserName('$userName')")->fetch(PDO::FETCH_OBJ);

  echo json_encode($response);

  $conn=null;
 ?>
