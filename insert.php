<?php
header('Access-Control-Allow-Origin: *'); 
include('connect.php');
#Connect to the database
//connection String


$mysqli  = mysqli_connect($hostname, $username, $password, $database);
//Select The database
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}


$sql = "INSERT INTO tblClients (FName, LName, Phone, APhone, Email)
VALUES ('".$_POST["fname"]."', '".$_POST["lname"]."', '".$_POST["phone"]."', '".$_POST["aphone"]."', '".$_POST["email"]."')";

if (mysqli_query($mysqli, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

?>