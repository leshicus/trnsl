<?
require_once("db_connect.php");

$textLogin = $_REQUEST["textLogin"];
/*$textFamily = $_REQUEST["textFamily"];
$textName = $_REQUEST["textName"];
$textLastname = $_REQUEST["textLastname"];
$comboSpeciality = $_REQUEST["comboSpeciality"];*/
$comboSystem = $_REQUEST["comboSystem"];
$textPassword = $_REQUEST["textPassword"];
$success = true;
$message = '';
$curdate = DATE_FORMAT(CURDATE(),'%d.%m.%Y');

// * проверим, что пользователь зарегистрирован
$sql_reg = "
 select u.userid
 from `user` u
 where u.login = '$textLogin'
 and u.begindate <= '$curdate'
 and u.enddate is null
 /*or (u.familyname = '$textFamily'
     and u.firstname = '$textName'
     and u.lastname = '$textLastname'
     and u.specid = '$comboSpeciality'
 )*/
";
try {
    $res_reg = $mysqli->query($sql_reg);
    $row_reg = $res_reg->fetch_row();
} catch (Exception $e) {
    $success = false;
    $message = $sql_reg;
}
$userid = $row_reg[0];
if ($userid) { // * пользователь существует. Проверим доступ к подсистеме
    $sql_sys = "
     select count(*) as nCNT
     from `user`     u,
          roleaccess ra
     where u.userid = '$userid'
     and   ra.roleid = u.roleid
     and   ra.subsystemid = '$comboSystem'
    ";
    try {
        $res_sys = $mysqli->query($sql_sys);
        $row_sys = $res_sys->fetch_row();
    } catch (Exception $e) {
        $success = false;
        $message = $sql_sys;
    }
    $nCNT = $row_sys[0];
    if($nCNT){ // * доступ разрешен
        $message = 'Доступ разрешен.';

        // * Залогируем вход в подсистему
        $sql_log = "
         insert into journal
         (enterdate, userid, subsystemid)
         values
         ('$curdate','$userid','$comboSystem')
        ";
        try {
            $res_log = $mysqli->query($sql_log);
        } catch (Exception $e) {
            $success = false;
            $message = $sql_log;
        }
    }else{  // * нет доступа к подсистеме
        $message = 'Доступ к подсистеме не разрешен.';
        $success = false;
    }
} else {
    $message = 'Указанный логин не зарегистрированы в системе.';
    $success = false;
}


if ($success) {
    echo json_encode(
        array('success' => $success,
            'message' => $message,
            'userid' => $userid));
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}


?>