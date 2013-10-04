<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$sid=$data['SUBJECT_ID'];
	$qid=$data['QUESTION_ID'];
	$qtext=$data['QUESTION_TEXT'];
	$qdescr=$data['QUESTION_DESCR'];
	$sql="insert into tn_question values('$qid','$qtext','$qdescr','$sid')";
	_execute($sql);
?>