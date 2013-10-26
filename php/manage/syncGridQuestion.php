<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once('../PhpConsole.php');

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        $questiontext = $data['questiontext'];
        $groupid = $data['groupid'];
        $knowid = $data['knowid'];

        $sql = "
            insert into question(
              questiontext,
              groupid,
              knowid
            )values(
              '$questiontext',
              '$groupid',
              '$knowid'
            );
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo '{rows:' . json_encode(
                array('questionid' => $mysqli->insert_id)) . '}';
            _log($mysqli, $userid, 14, 'Создание: '.$mysqli->insert_id.', '.$questiontext);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $sql = "select
                  questionid,
                  questiontext,
                  groupid,
                  knowid
		        from question";

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
        $questionid = $data['questionid'];
        $questiontext = $data['questiontext'];
        $groupid = $data['groupid'];
        $knowid = $data['knowid'];

        $sql = "
            update question
            set questiontext = '$questiontext',
                groupid = '$groupid',
                knowid = '$knowid'
            where questionid = '$questionid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }
        if($success){
            echo json_encode(
                array('success' => $success));
            _log($mysqli, $userid, 14, 'Исправление: '.$questionid.', '.$questiontext);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $questionid = $data['questionid'];

        $sql = "
            delete from question
            where questionid = '$questionid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
            $message = $sql;
        }

        if ($success) {
            _log($mysqli, $userid, 14, 'Удаление: '.$questionid);
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
