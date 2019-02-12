<?php 
require_once('init.php');
if(isset($_GET['file'])){
	$conn_id = ftp_connect($host);
	echo json_encode(ftp_mdtm($conn_id,$_GET['file']));
}
?>