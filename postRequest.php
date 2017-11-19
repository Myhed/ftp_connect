<?php
require_once("function.php");
session_start();
	$val = ['err' => true];
	$_SESSION['withoutAjax'] = 0;
	
if($_POST){
	extract($_POST);
	$val['pseudo'] = $name;
	echo ServerRespond(isAjax(),$name,$password);
}