<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once('../PhpConsole.php');

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);

switch ($act) {
    case 'create':
        $actid = $data['actid'];
        $groupnum = $data['groupnum'];

        $sql = "
            insert into `group`(
              actid,
              groupnum
            )values(
              '$actid',
              '$groupnum'
            );
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo '{rows:' . json_encode(
                array('groupid' => $mysqli->insert_id)) . '}';
            _log($mysqli, $userid, 15, 'Создание: '.$mysqli->insert_id.', '.$actid.', '.$groupnum);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $sql = 'select
                  actid,
                  groupnum,
                  groupid
		        from `group`
		        order by actid, groupnum';
        try {
            $res = $mysqli->query($sql);
            $list=array();
            while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
                foreach ($row as $k => $v)
                    $arr[$k]= $v;
                array_push($list, $arr);
            }
        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        echo '{rows:'.json_encode($list).'}';
        break;
    case 'update':
        $actid = $data['actid'];
        $groupnum = $data['groupnum'];
        $groupid = $data['groupid'];

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
        if($success){
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
            _log($mysqli, $userid, 15, 'Изменение: '.$groupid.', '.$actid.', '.$groupnum);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $groupid = $data['groupid'];

        $sql = "
            delete from `group`
            where groupid = '$groupid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('success' => $success));
            _log($mysqli, $userid, 15, 'Удаление: '.$groupid);
        }else{
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
