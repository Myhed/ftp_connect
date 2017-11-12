<?php  function isAjax(){

		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){

			return true;
		}

		return false;	
	}

	function ServerRespond($HowResponded=true,$name,$password,$connectWhere="localhost",$folder="."){
				if(!empty($name)&&!empty($password) || (isset($_SESSION['identifiant']) )){
					$conn_id= ftp_connect($connectWhere);
					if($conn_id){
						if($login = ftp_login($conn_id,$name,$password)){
							$val['err'] = false;
							$val['Dossier_perso'] = ftp_rawlist($conn_id,$folder);
                            $val['identifiant'] = $name;
                            
                            $_SESSION['identifiant'] = $name;
                            $_SESSION['mdp'] = $password; 
						}else{
							$val['err'] = "mdp ou identifiant incorrecte";
						}
					}else{
						$val['err'] = "Impossible de ce connecter au serveur";
					}
				}else{
					$val['err'] = "Vous devez saisir un mdp et un identifiant";
				}
				if($HowResponded){
					return json_encode($val);	
				}else{
					$_SESSION['withoutAjax'] = 1;
					$_SESSION['err'] = $val['err'];
					header('location:index.php');
			}
	}