<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$aid=$data['ANSWER_ID'];
	$atext=$data['ANSWER_TEXT'];
	$aright=$data['ANSWER_RIGHT'];
	if($aright=='да')
	{
		$aright=1;
	}
	else
	{
		$aright=0;
	}
	$sql="update tn_answer set answer_text='$atext',answer_right='$aright' where answer_id='$aid'";
	_execute($sql);
?>