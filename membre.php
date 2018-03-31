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
    <div id="mask"></div>
        <div id="form">
            <span id="closePopUp">X</span>
        <form action="" method="post" enctype="multipart/form-data" name="upload">
            <input type="file" name="file" />
            <button>upload</button>
        </form>
     </div>
    <div class="container">
        <ul id="menu">
            <li id="deconnexion"> <a href="deconnexion.php">Se déconnecter</a></li>
            <li id="upload"><a href="#" >Upload</a></li>
        </ul>
        <div class="clearfix"></div>
        <div id="filArianeContainer">
            <div id="filAriane"></div>
            <div id="backToRacine"></div>
            <div class="clearfix"></div>
        </div>
        <table id="table"></table>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.js"></script>
    <script src="js/function.js"></script>
    <script src="js/membre.js"></script>
    <script src="js/popupUpload.js"></script>
    <script src="js/download.js"></script>
    <script src="js/DownLoadFile.js"></script>
    <script src="js/dropzone.js"></script>
    <script src="js/upload.js"></script>
</body>
</html>
