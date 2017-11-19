<?php 
require_once('function.php');
session_start();
session_destroy();
$_SESSION = [];
unset($_SESSION);
if(isAjax()){
    $val = ['disconnected' => true];
    echo json_encode($val);
}else{
   
    header('location:index.php');
}