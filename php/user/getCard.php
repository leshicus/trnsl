<?
session_start();
/* 1. Создание билета, сохранение его в `card`
* */
require_once("../db_connect.php");
require_once("../include.php");

$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];
$know = $_REQUEST['know'];

if(isset($know)){  // самоподготовка

    if($know){  // указана ОЗ
        $sql = "
            select
                group_concat(questionid) as str
            from
                (select
                    q.questionid
                from
                    `user` u,
                    `speciality` s,
                    `question` q
                where u.userid = '$userid'
                and s.specid = u.specid
                and q.knowid = '$know'
                and q.groupid = s.groupid
                ORDER BY RAND()) t";
    }else{ // не указана ОЗ
        // * строка с рандомными questionid, в количестве $questionMaxInCard штук
        $sql = "
            select
                group_concat(questionid) as str
            from
                (select
                    q.questionid
                from
                    `user` u,
                    `speciality` s,
                    `question` q
                where u.userid = '$userid'
                and s.specid = u.specid
                and q.groupid = s.groupid
                ORDER BY RAND()) t";
    }
    try {
        $res = $mysqli->query($sql);
        $row = $res->fetch_row();
        $str = $row[0];
    } catch (Exception $e) {
        $success = false;
        $message = $sql;
    }

    // * возможные вопросы
    $sql = "select
            q.questionid,
            q.questiontext,
            a.answerid,
            a.answertext,
            a.correct,
            a.normdoc
            /*@n:=@n+1 as rownum*/
        from
            `question` q,
            `answer` a
        where a.questionid = q.questionid
        and q.questionid in (".$str.")";
    try {
        $res = $mysqli->query($sql);
        $list=array();
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            foreach ($row as $k => $v){
                $arr[$k]= $v;
            }
            array_push($list, $arr);
        }
    } catch (Exception $e) {
        $success = false;
        $message = $sql;
    }

    // * проставим rownum
    $questionid = null;
    $cnt = 0;
    foreach ($list as $k => $row){
        if ($row['questionid'] == $questionid){
            $list[$k]['rownum'] = $cnt;
            continue;
        }else{
            $questionid = $row['questionid'];
            $cnt++;
            $list[$k]['rownum'] = $cnt;
        }
    }
}else{ // экзамен
// * строка с рандомными questionid, в количестве $questionMaxInCard штук
    $sql = "
        select
            group_concat(questionid) as str
        from
            (select
                q.questionid
            from
                `user` u,
                `speciality` s,
                `question` q
            where u.userid = '$userid'
            and s.specid = u.specid
            and q.groupid = s.groupid
            ORDER BY RAND()
            LIMIT $questionAmount) t";
    try {
        $res = $mysqli->query($sql);
        $row = $res->fetch_row();
        $str = $row[0];
    } catch (Exception $e) {
        $success = false;
        $message = $sql;
    }

    // * возможные вопросы
    //$mysqli->query('set @n:=0;');
    $sql = "select
            q.questionid,
            q.questiontext,
            a.answerid,
            a.answertext,
            a.correct,
            a.normdoc
            /*@n:=@n+1 as rownum*/
        from
            `question` q,
            `answer` a
        where a.questionid = q.questionid
        and q.questionid in (".$str.")";
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
        $message = $sql;
    }

    // * сохраним в card сгенерированные вопросы по билету
    $questionid = null;
    $cnt = 0;
    foreach ($list as $k => $row){
        if ($row['questionid'] == $questionid){
            $list[$k]['rownum'] = $cnt;
            continue;
        }else{
            $questionid = $row['questionid'];

            $sql = "insert into `card`
                (userid, examid, questionid, correct)
                values
                ('$userid', '$examid', '$questionid', 0)";
            try {
                $res = $mysqli->query($sql);
            } catch (Exception $e) {
                $success = false;
                $message = $sql;
            }
            $cnt++;
            $list[$k]['rownum'] = $cnt;
        }
    }
}


if ($success) {
    _log($mysqli, $userid, 9, $examid);
    echo '{rows:'.json_encode($list).'}';
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}
// TODO Класс-Добавлние экзамена- Дата: порядок написания отличается от того, что выходит при обновлении

if ($mysqli)
    $mysqli->close();

?>

