<?php
	include('../../lib.php');
	$qid=$_REQUEST['qid'];
	$sql="select * from tn_answer where question_id='$qid'";// получаю все ответы на вопрос
	$response=array();
	_execute($sql,$response);
	$rand=array();
	randomize_mass($rand,count($response)); // функция для изменения порядка ответов
	for($i=0;$i<count($response);$i++)
	{
		$arr[$i]['ANSWER_ID']=$response[$rand[$i]]['ANSWER_ID'];
		$arr[$i]['ANSWER_TEXT']=$response[$rand[$i]]['ANSWER_TEXT'];
		if($i==count($response)-1)
		{
			$text.=$arr[$i]['ANSWER_ID'].'-'.$arr[$i]['ANSWER_TEXT'];
		}
		else
		{
			$text.=$arr[$i]['ANSWER_ID'].'-'.$arr[$i]['ANSWER_TEXT'].'_';
		}
	}
	echo $text;
?>