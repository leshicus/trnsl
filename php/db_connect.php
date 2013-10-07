<?
	$mysqli = new mysqli("localhost","root","1","transoil");

	if ($mysqli->connect_errno) {
		printf("Connect failed: %s\n", $conn->connect_error);
		exit();
	}
?>