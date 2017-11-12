<?php 
session_start();
if(isset($_SESSION['withoutAjax']) && $_SESSION['withoutAjax'] == 1){

	echo $_SESSION['err'];
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
		<table id="table"></table>
		<div id="err"></div>
		<form method="POST" action="connected.php">
			<label for="">name</label><br>
			<input type="text" name="name" id="name"><br>
			<label for="">password</label><br>
			<input type="password" name="password" id="password"><br>
			<input type="submit" value="Server connect">
		</form>
	</div>
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
	<script src="function.js"></script>
	<script src="postRequest.js"></script>
	<script src="getRequest.js"></script>
</body>
</html>