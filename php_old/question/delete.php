<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$qid=$data['QUESTION_ID'];
	if(isset($qid))
	{
		$sql="delete tn_question where question_id='$qid'";
		_execute($sql);
	}
?>