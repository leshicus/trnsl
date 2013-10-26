<?
session_start();
require_once("../db_connect.php");
require_once('../include.php');

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;
$userid = $_SESSION['userid'];


switch ($act) {
    case 'create':
        $fio = '';
        $curdate = date('Y.m.d H:i');
        // * определим ФИО наблюдателя
        $sql_fio = "select
          CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio
        from `user` u
		where u.userid = '$userid'";
        try {
            $res_fio = $mysqli->query($sql_fio);
            $row = $res_fio->fetch_row();
            $fio = $row[0];
        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        $sql = "
            insert into exam(
              examdate,
              userid
            )values(
              '".$curdate."',
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
                    array('examid' => $mysqli->insert_id,
                          'userid' => $userid,
                          'examdate' => $curdate,
                          'fio' => $fio  )) . '}';
            _log($mysqli, $userid, 17, 'Создание: '.$mysqli->insert_id.', '.$curdate);
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $dateFrom = $_REQUEST['dateFindFrom'];
        $dateTo = $_REQUEST['dateFindTo'];
        $where = "";
        if($dateFrom)
            $where.= " and DATE_FORMAT(e.examdate,'%d.%m.%Y') >= DATE_FORMAT('" . $dateFrom . "','%d.%m.%Y') ";
        if($dateTo)
            $where.= " and DATE_FORMAT(e.examdate,'%d.%m.%Y') <= DATE_FORMAT('" . $dateTo . "','%d.%m.%Y') ";
        if(!$dateFrom && !$dateTo)
            $where.= " and DATE_FORMAT(e.examdate,'%d.%m.%Y') = DATE_FORMAT(CURDATE(),'%d.%m.%Y') ";

        $sql = "select
                  examid,
                  DATE_FORMAT(examdate, '%d.%m.%Y %H:%i') as examdate,
                  e.userid,
                  CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio,
                  u.login
		        from exam   e,
		             `user` u
		        where u.userid = e.userid ".$where.
		        " order by examdate, u.familyname";
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
            $message = $sql;
        }

        if ($success) {
            _log($mysqli, $userid, 17, 'Удаление: '.$examid);
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
