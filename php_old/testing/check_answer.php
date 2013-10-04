<?php
	include('../../lib.php');
	$aid=$_REQUEST['aid'];
	$sql="select answer_right from tn_answer where answer_id='$aid'";
	$response=array();
	_execute($sql,$response);
	$rand=array();
	if($response[0]['ANSWER_RIGHT']=='1')
		$text='1';
	else
		$text='0';
	echo $text;
?>