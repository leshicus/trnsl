<?php
	include('../../lib.php');
	$response=array();
	$sql="select d.distribution_id,
				 a.activity_abbr,
				 s.subject_name,
				 d.question_part 
				 from tn_activity a,
					  tn_subject s, 
					  tn_distribution d 
				 where d.activity_id=a.activity_id 
				 and d.subject_id=s.subject_id 
				 order by d.activity_id,d.subject_id";
	_execute($sql,$response);
	echo '{rows:'.json_encode($response).'}';
?>