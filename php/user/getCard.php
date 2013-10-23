<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$success = true;
$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];

// * строка с рандомными questionid, в количестве $questionAmount штук
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
            //$res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }
        $cnt++;
        $list[$k]['rownum'] = $cnt;
    }
}

echo '{rows:'.json_encode($list).'}';

if ($mysqli)
    $mysqli->close();

?>

