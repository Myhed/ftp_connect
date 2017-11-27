<?php 
session_start();
if(isset($_SESSION['Erreur'])){

	echo $_SESSION['Erreur'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="css/style.css" />
</head>
<body>
	<div class="container" id="container">
		<div id="err"></div>
		<form method="POST" action="postRequest.php">
			<label for="">name</label><br>
			<input type="text" name="name" id="name"><br>
			<label for="">password</label><br>
			<input type="password" name="password" id="password"><br>
			<input type="submit" value="Server connect">
		</form>
	</div>
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
	<script src="js/function.js"></script>
	<script src="js/postRequest.js"></script>
</body>
</html>