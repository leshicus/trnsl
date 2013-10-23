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
                  u.login,
                  reg,
                  a.timelimit
		        from `class` c,
		             `user`  u,
		             `activity` a,
		             `speciality` s,
		             `group` g
		        where u.userid = c.userid
                and s.specid = u.specid
                and g.groupid = s.groupid
                and a.actid = g.actid
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
        foreach ($data as $row) {
            $userid = $row['userid'];
            $examid = $row['examid'];
            $reg = $row['reg'];

            if (!$userid) $userid = null;
            if (!$examid) $examid = null;
            if (!$reg) $reg = null;

            $sql = "
                    update `class`
                    set reg = '$reg'
                    where userid = '$userid'
                    and examid = '$examid'
            ";

            try {
                $res = $mysqli->query($sql);
            } catch (Exception $e) {
                $success = false;
            }
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
        foreach ($data as $row) {
            $examid = $row['examid'];
            $userid = $row['userid'];
            $sql = "
                delete from `class`
                where userid = '$userid'
                and examid = '$examid'
            ";
            try {
                $res = $mysqli->query($sql);
            } catch (Exception $e) {
                $success = false;
            }
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
    default:
        echo "default";
};

if ($mysqli)
    $mysqli->close();

?>
