<?php 
session_start();
require_once('init.php');
$val = ['err' => true,];
if(isset($_POST)){

	    $conn_id= ftp_connect($host);
        $login = ftp_login($conn_id,$_SESSION['identifiant'],$_SESSION['mdp']);
        $path = $_FILES['file']['tmp_name'];
        $tmpPath = explode('\\',$_FILES['file']['tmp_name']);
        $realPath = $tmpPath[0].'\\'.$tmpPath[1].'\\'.$tmpPath[2].'\\'.$_FILES['file']['name'];
        $otherPath = $tmpPath[0].'\\'.$tmpPath[1].'\\'.'htdocs'.'\\'.'ftp_connect'.'\\'.'file_upload'.'\\'.$_FILES['file']['name'];
        copy($_FILES['file']['tmp_name'],$otherPath);
        if(ftp_put($conn_id, $_SESSION['folder'].'/'.$_FILES['file']['name'],$otherPath, FTP_ASCII)){
        	echo json_encode($_SESSION['folder']);
        }
}