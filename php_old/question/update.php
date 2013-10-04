<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$qid=$data['QUESTION_ID'];
	$qtext=$data['QUESTION_TEXT'];
	$qdescr=$data['QUESTION_DESCR'];
	$sql="update tn_question set question_text='$qtext',question_descr='$qdescr' where question_id='$qid'";
	_execute($sql);
?>