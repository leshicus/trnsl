<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];
$questionid = $_REQUEST['questionid'];
$correct = $_REQUEST['correct'];

$sql = "
    update card
    set correct = '$correct'
    where userid = '$userid'
    and examid = '$examid'
    and questionid = '$questionid'";
try {
    $res = $mysqli->query($sql);
} catch (Exception $e) {
    $success = false;
}

if ($mysqli)
    $mysqli->close();

?>

