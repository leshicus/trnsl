<?php
	include('../../lib.php');
	$response=array();
	$sql='select * from tn_activity';
	_execute($sql,$response);
	//print_r($response);
	echo '{rows:'.json_encode($response).'}';
?>