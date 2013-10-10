<?
session_start();
require_once("../include.php");
$data = json_decode(file_get_contents('php://input'), true);
$success = true;
$userid = $_SESSION['userid'];
$examid = $data['examid'];

$query_id = "insert into class
            (examid, userid)
            values
            ('$examid','$userid')";

try {
    $result = oci_parse($conn, $query_id);
    if (!(oci_execute($result))) throw new Exception;
    oci_free_statement($result);
    echo json_encode(array('success' => true));
} catch (Exception $e) {
    echo json_encode(
        array('success' => false,
            'message' => $query));
}

if ($conn)
    oci_close($conn);
?>