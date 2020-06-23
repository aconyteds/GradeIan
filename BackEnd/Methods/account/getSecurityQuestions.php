<?php
  require "../dbConnect.php";

  $response = $conn->query("SELECT * from SecurityQuestions")->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($response);

  $conn=null;
?>
