<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$sid=$data['SUBJECT_ID'];
	$sname=$data['SUBJECT_NAME'];
	$sql="update tn_subject set subject_name='$sname' where subject_id='$sid'";
	_execute($sql);
?>