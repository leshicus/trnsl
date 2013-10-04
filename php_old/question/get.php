<?php
	include('../../lib.php');
	$sid=$_REQUEST['SUBJECT_ID'];
	$response=array();
	$sql="select * from tn_question where subject_id='$sid'";
	_execute($sql,$response);
	echo '{rows:'.json_encode($response).'}';
?>