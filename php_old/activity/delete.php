<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$aid=$data['ACTIVITY_ID'];
	if(isset($aid))
	{
		$sql="delete tn_activity where activity_id='$aid'";
		_execute($sql);
	}
?>