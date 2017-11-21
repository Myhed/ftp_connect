<?php
	$val = ['err' => true];
if($_POST){
	extract($_POST);
	if(!empty($name)&&!empty($password)){
		$conn_id= ftp_connect("localhost");
		if($conn_id){
			if($login = ftp_login($conn_id,$name,$password)){
				$val['err'] = false;
				// $val['Dossier_perso'] = ftp_rawlist($conn_id,".");
				$val['pseudo'] = $name;
			}else{
				$val['err'] = "mdp ou identifiant incorrecte";
			}
		}else{
			$val['err'] = "Impossible de ce connecter au serveur";
		}
	}else{
		$val['err'] = "Vous devez saisir un mdp un identifiant";
	}

}

echo json_encode($val);