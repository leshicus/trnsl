<?
require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        /*$specname = $data['specname'];
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
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }*/
        break;
    case 'read':
        $sql = "select
                  userid,
                  familyname,
                  firstname,
                  lastname,
                  roleid,
                  login,
                  DATE_FORMAT(begindate, '%d.%m.%Y %H:%i') as begindate,
                  DATE_FORMAT(enddate, '%d.%m.%Y %H:%i') as enddate,
                  u.specid,
                  s.groupid,
                  password
		        from `user` u,
		             speciality s
		        where s.specid = u.specid
		        order by familyname, firstname, lastname, begindate";
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
            $familyname = $row['familyname'];
            $firstname = $row['firstname'];
            $lastname = $row['lastname'];
            $roleid = $row['roleid'];
            $login = $row['login'];
            $begindate = $row['begindate'];
            $enddate = $row['enddate'];
            $specid = $row['specid'];
            $password = $row['password'];

            if (!$userid) $userid = null;
            if (!$familyname) $familyname = null;
            if (!$firstname) $firstname = null;
            if (!$lastname) $lastname = null;
            if (!$roleid) $roleid = null;
            if (!$login) $login = null;
            if (!$begindate) $begindate = null;
            if (!$enddate) $enddate = null;
            if (!$specid) $specid = null;

            if(!$password){
                $password = $initPassword;
                $sql = "
                    update `user`
                    set familyname = '$familyname',
                        firstname = '$firstname',
                        lastname = '$lastname',
                        roleid = '$roleid',
                        specid = '$specid',
                        password = '$password',
                        enddate = DATE_FORMAT(STR_TO_DATE('".$enddate."', '%d.%m.%Y %H:%i'),'%Y.%m.%d %H:%i')
                    where userid = '$userid'
                ";
                _log($mysqli, $userid, 3, 'Сброс пароля на начальный: '.$familyname.' '.$firstname.' '.$lastname);
            }else{
                $sql = "
                    update `user`
                    set familyname = '$familyname',
                        firstname = '$firstname',
                        lastname = '$lastname',
                        roleid = '$roleid',
                        specid = '$specid',
                        enddate = DATE_FORMAT(STR_TO_DATE('".$enddate."', '%d.%m.%Y %H:%i'),'%Y.%m.%d %H:%i')
                    where userid = '$userid'
                ";
                if($enddate){
                    _log($mysqli, $userid, 3, 'Блокировка пользователя: '.$familyname.' '.$firstname.' '.$lastname.', '.$enddate);
                }else{
                    _log($mysqli, $userid, 3, 'Изменение или разблокировка пользователя: '.$familyname.' '.$firstname.' '.$lastname.', '.$roleid.', '.$specid.', '.$enddate);
                }
            }

            try {
                $res = $mysqli->query($sql);
                // * логирование
                if(!$password){
                    _log($mysqli, $userid, 8, 'Сброс пароля на начальный: '.$familyname.' '.$firstname.' '.$lastname);
                }else{
                    if($enddate){
                        _log($mysqli, $userid, 3, 'Блокировка пользователя: '.$familyname.' '.$firstname.' '.$lastname.', '.$enddate);
                    }else{
                        _log($mysqli, $userid, 3, 'Изменение или разблокировка пользователя: '.$familyname.' '.$firstname.' '.$lastname.', '.$roleid.', '.$specid.', '.$enddate);
                    }
                }
            } catch (Exception $e) {
                $success = false;
            }
        }
        if($success){
            echo json_encode(
                array('success' => $success));
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        foreach ($data as $row) {
            $userid = $row['userid'];
            if (!$userid) $userid = null;

            $sql = "
                delete from `user`
                where userid = '$userid'
            ";
            try {
                $res = $mysqli->query($sql);
            } catch (Exception $e) {
                $success = false;
                $message = $sql;
            }
        }

        if ($success) {
            _log($mysqli, $userid, 3, 'Удаление: '.$userid);
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
