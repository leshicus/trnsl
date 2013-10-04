<?php
	include('../../lib.php');
	$qid=$_REQUEST['QUESTION_ID'];
	$response=array();
	$sql="select answer_id,answer_text,decode(answer_right,'1','да','0','нет') answer_right,question_id from tn_answer where question_id='$qid'";
	_execute($sql,$response);
	echo '{rows:'.json_encode($response).'}';
?>