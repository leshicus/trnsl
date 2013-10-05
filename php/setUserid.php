<?session_start();

$userid = $_REQUEST["userid"];
$_SESSION['userid'] = $userid;

echo $userid;
?>