<?php
	include('../../lib.php');
	define("QUESTION_SIZE",15);
	/*получаем необходимые параметры*/
	//$aid=$_RESPONSE['ACTIVITY_ID'];// номер того,чем занимается тестируемый
	$aid=4;//пока
	/*------------------------------*/
	function _rand($input,&$output,$n)
	{
		$rand=array();
		randomize_mass($rand,$n);
		for($i=0;$i<$n;$i++)
		{
			$output[$i]['QUESTION_ID']=$input[$rand[$i]]['QUESTION_ID'];
			$output[$i]['QUESTION_TEXT']=$input[$rand[$i]]['QUESTION_TEXT'];
			$output[$i]['QUESTION_DESCR']=$input[$rand[$i]]['QUESTION_DESCR'];
			$output[$i]['SUBJECT_ID']=$input[$rand[$i]]['SUBJECT_ID'];
		}
	}
	/*получаем распределение вопросов*/
	$sql_distribution="select * from tn_distribution where activity_id='$aid'";// получаю распределение
	$dresponse=array();
	_execute($sql_distribution,$dresponse);
	$dcount=count($dresponse);// число областей по которым разбиваем вопросы
	$k=0;
	$l=0;
	$result=array();
	for($i=0;$i<$dcount;$i++)
	{
		$sid=$dresponse[$i]['SUBJECT_ID'];
		$part=$dresponse[$i]['QUESTION_PART'];
		$sql_question="select * from tn_question where subject_id='$sid'";
		$qresponse=array();
		_execute($sql_question,$qresponse);
		$qcount=count($qresponse);// вопросов по области знаний
		$temp=array();
		_rand($qresponse,$temp,$qcount);
		$partition=(QUESTION_SIZE*$part)/100;
		if(!is_int($partition))
		{
			if($k==0)
			{
				$partition=ceil($partition);
				$k=1;
			}
			else
			{
				$partition=floor($partition);
				$k=0;
			}
		}
		if($partition==0)
		{
			$partition=1;
			$k=1;
		}
		for($j=0;$j<$partition;$j++)
		{
			$result[$l]['QUESTION_ID']=$temp[$j]['QUESTION_ID'];
			$result[$l]['QUESTION_TEXT']=$temp[$j]['QUESTION_TEXT'];
			$result[$l]['QUESTION_DESCR']=$temp[$j]['QUESTION_DESCR'];
			$result[$l]['SUBJECT_ID']=$temp[$j]['SUBJECT_ID'];
			$l++;
		}
	}
	$to_user=array();
	_rand($result,$to_user,count($result));//последняя сортировка случайным образом
	echo '{rows:'.json_encode($to_user).'}';
?>