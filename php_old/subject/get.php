<?php
	include('../../lib.php');
	$response=array();
	$sql='select * from tn_subject order by subject_name';
	_execute($sql,$response);
	echo '{rows:'.json_encode($response).'}';
?>