<?php
session_start();

include("config.php");
include("function.php");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    die();
}


function login($username, $password)
{
    global $conn;
    if (checkLogin($username, $password)>0) {
        
        $_SESSION['username'] = $username;
        header("Location: ../index.php");

    } else {

        echo '
            <script type="text/javascript">
            alert("Pogrešno ste uneli korisničko ime ili lozinku ");
            window.location.href = "../index.php";
            </script>';
    }
}

function checkLogin($username, $password)
{
    global $conn;

    $pass = md5($password);
    $result = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
    $result->bind_param("ss", $username, $pass);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if ($num_rows > 0) {
        return $num_rows;
    } else {
        return 0;
    }
}


function register($name, $email, $username, $password)
{
    global $conn;
    $errors = false;
    if (checkIfUserExists($username)) {
        $errors = true;
        echo '
            <script type="text/javascript">
            alert("Korisnik sa ovim imenom već postoji u bazi podataka");
            window.location.href = "../index.php";
            </script>';
    }else{
        $stmt = $conn->prepare("INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)");
        $pass = md5($password);
        $stmt->bind_param("ssss",  $name, $email, $username, $pass);
        if ($stmt->execute()) {
            $_SESSION['username'] = $username;
            header("Location: ../index.php");
        } else {
            echo '
            <script type="text/javascript">
            alert("Greška u konekciji sa bazom ");
            window.location.href = "../index.php";
            </script>';
        }
    }
}

function checkIfUserExists($username)
{
    global $conn;
    $result = $conn->prepare("SELECT * FROM users WHERE username=?");
    $result->bind_param("s", $username);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if ($num_rows > 0) {
        return true;
    } else {
        return false;
    }
}