<?php
$dbserver = "localhost:3306";
$dbun = "root";
$dbpw = "Spring@@03072017";

try {
    $conn = new PDO("mysql:host=$dbserver;dbname=gradeIan", $dbun, $dbpw);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "<p>Connected successfully</p>";
    }
catch(PDOException $e)
    {
    echo "<p>Connection failed: " . $e->getMessage() . "</p>";
    }
$dbserver=null;
$dbun = null;
$dbpw=null;
?>
