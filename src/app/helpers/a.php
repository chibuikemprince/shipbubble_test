<?php

$uri = "mysql://avnadmin:AVNS_0c2aHnqRJMS3VtBR_la@mysq-shipbubble-shipbubble.a.aivencloud.com:20703/defaultdb?ssl-mode=REQUIRED";
//   "host": "mysql://avnadmin:AVNS_0c2aHnqRJMS3VtBR_la@mysq-shipbubble-shipbubble.a.aivencloud.com:20703/defaultdb?ssl-mode=REQUIRED",
  
$fields = parse_url($uri);

// build the DSN including SSL settings
$conn = "mysql:";
$conn .= "host=" . $fields["host"];
$conn .= ";port=" . $fields["port"];
$conn .= ";dbname=defaultdb";
$conn .= ";sslmode=verify-ca;sslrootcert=ca.pem";

try {
  $db = new PDO($conn, $fields["user"], $fields["pass"]);

  $stmt = $db->query("SELECT VERSION()");
  print($stmt->fetch()[0]);
  echo "Connected successfully - ".$conn;
} catch (Exception $e) {
  echo "Error: " . $e->getMessage();
}