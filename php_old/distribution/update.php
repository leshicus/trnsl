<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$did=$data['DISTRIBUTION_ID'];
	$dpart=$data['QUESTION_PART'];
	$sql="update tn_distribution set question_part='$dpart' where distribution_id='$did'";
	_execute($sql);
?>