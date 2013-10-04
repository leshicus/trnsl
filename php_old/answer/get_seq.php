<?php
	include('../../lib.php');
	$response=array();
	$sql="select seq_tnanswer.nextval answer_id from dual";
	_execute($sql,$response);
	echo $response[0]['ANSWER_ID'];
?>