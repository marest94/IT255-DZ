<?php
session_start();


include ("config.php");
include ("functions.php");

global $conn;


if(isset($_POST['register'])){

	$name = mysqli_real_escape_string($conn,$_POST['name']);
	$email = mysqli_real_escape_string($conn,$_POST['email']);
    $username = mysqli_real_escape_string($conn,$_POST['username']);
	$password = mysqli_real_escape_string($conn,$_POST['password']);
	echo register($name, $email, $username, $password);

}

?>

