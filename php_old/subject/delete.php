<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$sid=$data['SUBJECT_ID'];
	if(isset($sid))
	{
		$sql="delete tn_subject where subject_id='$sid'";
		_execute($sql);
	}
?>