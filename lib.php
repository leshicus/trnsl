<?php
	/*connection to Database*/
	$TNS="(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=10.100.50.11)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=IUSDB.DEVELOPERS)))";
	$PASS="gdb";
	$USER="GANGTEMP";
	$connection=0;
	function _connect() 
	{
		try
		{
			global $PASS,$TNS,$USER,$connection;
			$connection=oci_connect($USER,$PASS,$TNS,'AL32UTF8');
			if(!$connection)
			{
				$error=oci_error();
				throw new Exception($error['message'].'.While connecting.');
			}
			else 
			{
				return $connection;
			}  
		}
		catch(Exception $exp)
		{
			_log($exp->getMessage());
			die('Error in attempt connecting to database!');
		}
	}
	_connect();
	/*log for errors*/
	function _log($string)
	{
		$logstring=":: ".$string."; \r\n";
		$fp=fopen('log.txt','a+');
		fwrite($fp,$logstring);
		fclose($fp);
	}
	/*to clean the log*/
	function clean_log()
	{
		try
		{
			$file_name='log.txt';
			if(file_exists($file_name))
			{
				$size=filesize($file_name);
				if($size>100000)
				{
					$handle=fopen($file_name,'w');
					if(!$handle)
					{
					   throw new Exception; 
					}
					else 
					{
						fclose($handle);
						return 1;
					}
				}
			}
			else
			{
				throw new Exception;
			}
		}
		catch(Exception $exp)
		{
			return 0;
		}
	}
	clean_log();
	/*commiting script and returning results */
	function _execute($script,&$answer) 
	{
		try
		{
			global $connection;
			$i=0;
			$local_answer=array();
			$result=oci_parse($connection,$script);
			if(!$result) 
			{
				$error=oci_error($connection);
				throw new Exception($error['message'].'. While parsing.In ');
			}
			$exec=oci_execute($result);
			if($exec) 
			{
				while($row=oci_fetch_array($result)) 
				{
					$local_answer[$i++]=$row;
				}
				if (isset($local_answer[0])) 
				{
					$answer=$local_answer;
					return true;
				}
			}
			else 
			{
				$error=oci_error($result);
				throw new Exception($error['message'].'. While executing:'.strtoupper($error['sqltext']));
			}
		}
		catch(Exception $exp)
		{
			_log($exp->getMessage());
			return false;
		}
	}
	/*-блок функций-*/
	function get_aid()
	{
		$response=array();
		$sql="select activity_id from tn_activity order by activity_id";
		_execute($sql,$response);
		return $response;
	}
	function get_sid()
	{
		$response=array();
		$sql="select subject_id from tn_subject order by subject_id";
		_execute($sql,$response);
		return $response;
	}
	function randomize_mass(&$mass,$cnt) 
	{
		for ($i=0;$i<$cnt;) 
		{
			$rv=rand(0,$cnt-1);
			for($j=0;$j<$i;$j++) 
			{
				if($mass[$j]==$rv) 
				{
					$rv=-1;
					break;
				}
			}
			if($rv!=-1) 
			{
				$mass[$i]=$rv;
				$i++;
			}
		}
	}
	/*--------------*/
?>