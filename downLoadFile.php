<?php
session_start();
require('function.php');
require_once('init.php');
$value = ['error' => false];
if(isset($_SESSION)){
    if(isset($_GET['download']) && !empty($_GET['download']) || (isset($_GET['upload']) && !empty($_GET['upload']))){
        $local_file = "C:".getenv("HOMEPATH")."\Documents\\".$_GET['download'];
        $server_file = $_GET["download"];
        $value['server'] = $server_file;
        $conn_id= ftp_connect($host);
        $login = ftp_login($conn_id,$_SESSION['identifiant'],$_SESSION['mdp']);
        $fileOrFolder = getTypeOfFile($server_file);
        if(isset($matches[2])){
            if (ftp_get($conn_id, $local_file, $server_file, FTP_BINARY)) {
                 $value['FileDownloaded'] = $local_file;
            } else {
            $err['error'] = true;
          }
        }
        echo json_encode($value);
    }
}else{  
    header('location:index.php');
}