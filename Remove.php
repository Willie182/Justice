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
if ($_POST["action"] == "Get" ){
  $String = '[';
  $result = $mysqli -> query("SELECT * FROM  tblClients");
  while ($row = mysqli_fetch_assoc($result)) {
          $String .= '{
              "ID" : "'.$row['ID'].'", 
              "First_Name" : "'.$row['FName'].'", 
              "Last_Name" : "'.$row['LName'].'", 
              "Phone" : "'.$row['Phone'].'", 
              "Alternate_Phone" : "'.$row['APhone'].'", 
              "Email" : "'.$row['Email'].'"},';
        
  }
  $String = substr($String, 0, -1);
  $String .= ']';
  echo $String;
}
if ($_POST["action"] == "Delete" ){
  $sql = "DELETE FROM tblClients WHERE ID = ".$_POST["ID"];
  
  if (mysqli_query($mysqli, $sql)) {
    echo "Record deleted successfully";
  } else {
    echo "Error updating record: " . $mysqli->error;
  }
}

?>