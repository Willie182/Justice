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

if ($_POST["action"] == "Select" ){
  $String = '[';
  $result = $mysqli -> query("SELECT * FROM  tblClients");
  while ($row = mysqli_fetch_assoc($result)) {
          $String .= '{
              "ID": "'.$row['ID'].'", 
              "First_Name" : "'.$row['FName'].'", 
              "Last_Name" : "'.$row['LName'].'"},';
        
  }
  $String = substr($String, 0, -1);
  $String .= ']';
  echo $String;
}

if ($_POST["action"] == "GetClient" ){
  $String = '[';
  $result = $mysqli -> query("SELECT * FROM  tblClients WHERE ID = ".$_POST["ID"]);
  while ($row = mysqli_fetch_assoc($result)) {
          $String .= '{
            "First_Name" : "'.$row['FName'].'", 
            "Last_Name" : "'.$row['LName'].'", 
            "Phone" : "'.$row['Phone'].'", 
            "Alternate_Phone" : "'.$row['APhone'].'", 
            "Email" : "'.$row['Email'].'"}';
        
  }
  $String .= ']';
  echo $String;
}

if ($_POST["action"] == "Update" ){

  $sql = "UPDATE tblClients SET FName ='".$_POST["fname"]."', LName ='".$_POST["lname"]."', Phone ='".$_POST["phone"]."', APhone ='".$_POST["aphone"]."', Email ='".$_POST["email"]."' WHERE ID = ".$_POST["ID"];
  
  if (mysqli_query($mysqli, $sql)) {
    echo "Record updated successfully";
  } else {
    echo "Error updating record: " . $mysqli->error;
  }
}
?>