<?php
header('Access-Control-Allow-Origin: *'); 
//include('connect.php');
#Connect to the database
//connection String
$hostname = "bsh5lxabkyevyljeupv9-mysql.services.clever-cloud.com";
$username = "urswybbjwenxfbv8";
$password = "WtK3Rxc7o7aiDjQOJxo7";
$database = "bsh5lxabkyevyljeupv9";

$mysqli  = mysqli_connect($hostname, $username, $password, $database);
//Select The database
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
$String = '[';
$result = $mysqli -> query("SELECT * FROM  tblClients");
while ($row = mysqli_fetch_assoc($result)) {
        $String .= '{
            "First Name" : "'.$row['FName'].'", 
            "Last Name" : "'.$row['LName'].'", 
            "Phone" : "'.$row['Phone'].'", 
            "Aletnate Phone" : "'.$row['APhone'].'", 
            "Email" : "'.$row['Email'].'"}';
      
}
$String .= ']';
echo $String;
?>