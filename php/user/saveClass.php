<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];
$balls = $_REQUEST['balls'];
$result = $_REQUEST['result'];

$sql = "
    update class
    set balls = '$balls',
    result = '$result'
    where userid = '$userid'
    and examid = '$examid'";
try {
    $res = $mysqli->query($sql);
} catch (Exception $e) {
    $success = false;
}

if ($mysqli)
    $mysqli->close();

?>

