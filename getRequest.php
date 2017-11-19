<?php 
require_once("function.php");
session_start();
$val = ['err' => true,];
$_SESSION['withoutAjax'] = 0; 
if(isset($_SESSION['identifiant'])){
    if(isset($_GET['folder'])){
        $val['err'] = false;
        $name_folder = isset($_SESSION['Dossier_persos']["Dossier_".$_GET['folder']]) ? $_SESSION['Dossier_persos']["Dossier_".$_GET['folder']] :  $_SESSION['Dossier_persos']["Dossier_root"];
        $conn_id= ftp_connect("localhost");
        ftp_login($conn_id,$_SESSION['identifiant'],$_SESSION['mdp']);
        $val['Dossier_persos'] = ftp_rawlist($conn_id,$_GET['folder']);
       echo json_encode($val);
     }
}else{
    header('location:index.php');
}