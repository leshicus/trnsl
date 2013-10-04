<?
require_once("../db_connect.php");
require_once('../include.php');

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        $examdate = $data['examdate'];

        $sql = "
            insert into exam(
              examdate,
              userid
            )values(
              '$examdate',
              '$userid'
            );
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo '{rows:' . json_encode(
                    array('examid' => $mysqli->insert_id)) . '}';
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $sql = "select
                  examid,
                  examdate,
                  e.userid,
                  CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio,
                  u.login
		        from exam   e,
		             `user` u
		        where u.userid = e.userid
		        /*and e.examdate = CURDATE()*/
		        order by examdate, u.familyname";
        try {
            $res = $mysqli->query($sql);
            $list = array();
            while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
                foreach ($row as $k => $v)
                    $arr[$k] = $v;
                array_push($list, $arr);
            }
        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        echo '{rows:' . json_encode($list) . '}';
        break;
    case 'update':
        /*$examdate = $data['examdate'];

        $sql = "
            update `group`
            set actid = '$actid',
                groupnum = '$groupnum'
            where groupid = '$groupid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }
        if ($success) {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }*/

        break;
    case 'destroy':
        $examid = $data['examid'];

        $sql = "
            delete from exam
            where examid = '$examid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    default:
        echo "default";
};

if ($mysqli)
    $mysqli->close();

?>
