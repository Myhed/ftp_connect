<?php 
require_once("function.php");
session_start();
$val = ['err' => true];
$_SESSION['withoutAjax'] = 0;
if(isset($_SESSION['identifiant'])){

    if(isset($_GET['folder'])){
        $conn_id= ftp_connect("localhost");
        ftp_login($conn_id,$_SESSION['identifiant'],$_SESSION['mdp']);
       $val = ftp_rawlist($conn_id,$_GET['folder']);
     }
}else{
    header('location:index.php');
}