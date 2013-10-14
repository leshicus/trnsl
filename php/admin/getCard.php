<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$success = true;
$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];

// * количество возможных вопросов
$sql = "select
        count(*)
    from
        `user` u,
        `speciality` s,
        `question` q,
        `answer` a
    where u.userid = '$userid'
    and s.specid = u.specid
    and q.groupid = s.groupid
    and a.questionid = q.questionid";
try {
    $res = $mysqli->query($sql);
    $row = $res->fetch_row();
    $cnt = $row[0];
} catch (Exception $e) {
    $success = false;
}


// * возможные вопросы
$sql = "select
        q.questionid,
        q.questiontext,
        a.answerid,
        a.answertext,
        a.correct,
        a.normdoc
    from
        `user` u,
        `speciality` s,
        `question` q,
        `answer` a
    where u.userid = '$userid'
    and s.specid = u.specid
    and q.groupid = s.groupid
    and a.questionid = q.questionid";
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

// генерируем массив на основе выборки из базы
/*SELECT t.pk_id
FROM
  test as t,
  (
  SELECT ROUND(
    (SELECT MAX(pk_id)
       FROM test) *rand()
      ) as rnd
    FROM test
    LIMIT 100
  ) tmp
WHERE t.pk_id in (rnd)
ORDER BY pk_id*/

(SELECT ROUND(
    (SELECT MAX(questionid)
         FROM question) *rand()
    ) as questionid
    FROM question)
    limit 10

$sql = "
    SELECT distinct ROUND(
       (SELECT MAX(answerid)
         FROM answer) *rand()
    ) as answerid
    FROM answer
    LIMIT 10";
try {
    $res = $mysqli->query($sql);
    $listAnswerid=array();
    while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $arr[$k]= $v;
        array_push($listAnswerid, $arr);
    }
} catch (Exception $e) {
    $success = false;
}



echo '{rows:'.json_encode($list).'}';

// * сохраним в card сгенерированные вопросы по билету
$query = "select
        q.questionid,
        q.questiontext,
        a.answerid,
        a.answertext,
        a.correct,
        a.normdoc
    from
        `user` u,
        `speciality` s,
        `question` q,
        `answer` a
    where u.userid = '$userid'
    and s.specid = u.specid
    and q.groupid = s.groupid
    and a.questionid = q.questionid";
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

if ($mysqli)
    $mysqli->close();

?>

