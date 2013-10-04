<?
require_once("../db_connect.php");
require_once('../PhpConsole.php');

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        /*$actid = $data['actid'];
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
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }*/
        break;
    case 'read':
        $sql = "select
                  examid,
                  c.userid,
                  balls,
                  result,
                  CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio,
                  u.login
		        from `class` c,
		             `user`  u
		        where u.userid = c.userid

		        order by fio";
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
        /*$actid = $data['actid'];
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
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }*/

        break;
    case 'destroy':
        $examid = $data['examid'];
        $userid = $data['userid'];

        $sql = "
            delete from `class`
            where userid = '$userid'
            and examid = '$examid'
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
