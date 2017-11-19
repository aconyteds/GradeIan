<?php
  require "../dbConnect.php";

  $response = $conn->query("SELECT * from securityQuestions")->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($response);

  $conn=null;
?>
