<?php
	include('../../lib.php');
	$response=array();
	$sql="select seq_tnquestion.nextval question_id from dual";
	_execute($sql,$response);
	echo $response[0]['QUESTION_ID'];
?>