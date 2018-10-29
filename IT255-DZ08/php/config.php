<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "root";
$port = 8889;
$db = "it255_dz08";


$conn = new mysqli($servername, $username, $password, $db, $port);



if (!$conn->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
    exit();
}
?>