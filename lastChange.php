<?php 
if(isset($_GET['file'])){
	$conn_id = ftp_connect('localhost');
	echo json_encode(ftp_mdtm($conn_id,$_GET['file']));
}
?>