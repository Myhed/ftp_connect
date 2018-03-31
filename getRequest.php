<?php 
require_once("function.php");
session_start();
$val = ['err' => true,];
$_SESSION['withoutAjax'] = 0; 
if(isset($_SESSION['identifiant'])){
    if(isset($_GET['folder'])){
        $val['err'] = false;
        $repertoire = empty($_GET['folder']) ? '.':$_GET['folder'];
       if($repertoire === '.'){
       	$_SESSION['folder'] = $_GET['folder'];
       }else{
       	 $_SESSION['folder'] = '/'.$_GET['folder'];
       }
        $conn_id= ftp_connect("localhost");
        ftp_login($conn_id,$_SESSION['identifiant'],$_SESSION['mdp']);
        $val['Dossier_persos'] = ftp_rawlist($conn_id,$repertoire);
       echo json_encode($val);
     }
}else{
    header('location:index.php');
}