<?php
session_start();


include ("config.php");
include ("functions.php");

global $conn;


if(isset($_POST['login'])){

	$username = mysqli_real_escape_string($conn,$_POST['username']);
	$password = mysqli_real_escape_string($conn,$_POST['password']);

	echo login($username,$password);

}

?>

