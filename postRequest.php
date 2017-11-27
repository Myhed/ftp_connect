<?php
require_once("function.php");
session_start();
	$val = ['err' => true,'messages' => []];
if($_POST){
	extract($_POST);
	if(!empty($name)&&!empty($password)){
	
		$conn_id= ftp_connect('localhost');
		if($conn_id){
			if($login = ftp_login($conn_id,$name,$password)){
				$val['err'] = false;
				$val['Dossier_persos'] = ftp_rawlist($conn_id,'.');
				$val['identifiant'] = $name;
			
				$_SESSION['identifiant'] = $name;
				$_SESSION['mdp'] = $password; 
			}else{
				$val['messages'] = "mdp ou identifiant incorrecte";
			}

		}else{
		
			$val['messages'] = "Impossible de ce connecter au serveur";
		}

	}else{
		$val['messages'] = "Vous devez saisir un mdp et un identifiant";
	}
}

if(isAjax()){
	echo json_encode($val);
}else{	
	
	$_SESSION['Erreur'] = $val['messages'];

	header('location:index.php');
}
