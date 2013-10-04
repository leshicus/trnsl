<?php
	/*-----------------------------------------*/
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$aid=$data['ACTIVITY_ID'];
	$aname=$data['ACTIVITY_NAME'];
	$abbr=$data['ACTIVITY_ABBR'];
	$sql="insert into tn_activity values('$aid','$aname','$abbr')";
	_execute($sql);
	
	/*сохраняем в таблицу распределения вопросов*/
	$sids=array();
	$sids=get_sid();
	$n=count($sids);
	for($i=0;$i<$n;$i++)
	{
		$script="insert into tn_distribution values('$aid','".$sids[$i]['SUBJECT_ID']."',0,(select count(*)+1 from tn_distribution))";
		_execute($script);
	}
	/*-----------------------------------------*/
?>