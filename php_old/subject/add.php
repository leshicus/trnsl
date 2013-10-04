<?php
	include('../../lib.php');
	$data=json_decode(file_get_contents('php://input'),true);
	$sid=$data['SUBJECT_ID'];
	$sname=$data['SUBJECT_NAME'];
	$sql="insert into tn_subject values('$sid','$sname')";
	_execute($sql);
	/*блок добавления новых предметов в таблицу распределения*/
	$aids=array();
	$aids=get_aid();
	$n=count($aids);
	for($i=0;$i<$n;$i++)
	{
		$script="insert into tn_distribution values('".$aids[$i]['ACTIVITY_ID']."','$sid',0,(select count(*)+1 from tn_distribution))";
		_execute($script);
	}
	/**/
?>