<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$aid=$data['ANSWER_ID'];
	if(isset($aid))
	{
		$sql="delete tn_answer where answer_id='$aid'";
		_execute($sql);
	}
?>