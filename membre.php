<?php
session_start();
if(!isset($_SESSION['identifiant'])){

    header('location:index.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css"/>
    <title>Document</title>
</head>
<body>
    <div class="container">
        <a href="deconnexion.php" id="deconnexion">Se déconnecter</a>
        <div class="clearfix"></div>
        <div id="filAriane"></div>
        <table id="table"></table>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.js"></script>
    <script src="js/function.js"></script>
    <script src="js/membre.js"></script>
</body>
</html>
