<?
require_once("../db_connect.php");
require_once('../PhpConsole.php');

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        $examid = $data['examid'];

        $sql = "
            insert into `signgroup`(
              examid
            )values(
              '$examid'
            );
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo '{rows:' . json_encode(
                array('signgroupid' => $mysqli->insert_id)) . '}';
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $sql = "select
                  signgroupid,
                  examid,
                  familyname,
                  firstname,
                  lastname,
                  CONCAT_WS(' ',familyname,firstname,lastname) as fio
		        from `signgroup`
		        order by familyname, firstname";
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
        $signgroupid = $data['signgroupid'];
        $familyname = $data['familyname'];
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];

        if(!$familyname) $familyname = null;
        if(!$firstname) $firstname = null;
        if(!$lastname) $lastname = null;

        $sql = "
            update `signgroup`
            set familyname = '$familyname',
                firstname = '$firstname',
                lastname = '$lastname'
            where signgroupid = '$signgroupid'
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
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $signgroupid = $data['signgroupid'];

        $sql = "
            delete from `signgroup`
            where signgroupid = '$signgroupid'
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
