<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once('../PhpConsole.php');

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);

switch ($act) {
    case 'create':
        $specname = $data['specname'];
        $groupid = $data['groupid'];

        $sql = "
            insert into speciality(
              specname,
              groupid
            )values(
              '$specname',
              '$groupid'
            );
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo '{rows:' . json_encode(
                array('specid' => $mysqli->insert_id)) . '}';
            _log($mysqli, $userid, 16, 'Создание: '.$mysqli->insert_id.', '.$specname);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $sql = 'select
                  specid,
                  specname,
                  groupid
		        from speciality
		        order by specname';
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
        $specid = $data['specid'];
        $specname = $data['specname'];
        $groupid = $data['groupid'];

        $sql = "
            update speciality
            set specname = '$specname',
                groupid = '$groupid'
            where specid = '$specid'
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
            _log($mysqli, $userid, 16, 'Исправление: '.$specid.', '.$specname);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $specid = $data['specid'];

        $sql = "
            delete from speciality
            where specid = '$specid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            _log($mysqli, $userid, 16, 'Удаление: '.$specid);
            echo json_encode(array('success' => $success));
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $message));
        }

        break;
    default:
        echo "default";
};

if ($mysqli)
    $mysqli->close();

?>
