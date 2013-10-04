<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$aid=$data['ACTIVITY_ID'];
	$aname=$data['ACTIVITY_NAME'];
	$abbr=$data['ACTIVITY_ABBR'];
	$sql="update tn_activity set activity_name='$aname',activity_abbr='$abbr' where activity_id='$aid'";
	_execute($sql);
?>