<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$aid=$data['ANSWER_ID'];
	$qid=$data['QUESTION_ID'];
	$atext=$data['ANSWER_TEXT'];
	$sql="insert into tn_answer values('$aid','$atext',0,'$qid')";
	_execute($sql);
?>