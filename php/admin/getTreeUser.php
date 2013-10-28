<?
require_once("../db_connect.php");

$success = true;

// * виды деятельности
$actQuery = "
            select
              a.actid,
              a.actname,
              a.actnum,
              a.actabbr
            from activity a
            order by a.actnum
        ";
try {
    $actRes = $mysqli->query($actQuery);
    while ($row = $actRes->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $actList[$i][$k] = $v;
        $i++;
    }
} catch (Exception $e) {
    $success = false;
    echo json_encode(
        array('success' => $success,
            'message' => $actQuery));
}

// * группы
$groupQuery = "
            select
              g.actid,
              g.groupid,
              g.groupnum
            from `group` g
            order by g.groupnum
        ";
try {
    $groupRes = $mysqli->query($groupQuery);
    while ($row = $groupRes->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $groupList[$i][$k] = $v;
        $i++;
    }
} catch (Exception $e) {
    $success = false;
    echo json_encode(
        array('success' => $success,
            'message' => $groupQuery));
}

// * формирование дерева
$out = '{
        "success": true,
        "children": [';
$cntAct = 0;
foreach ($actList as $i => $rowAct) {
    if ($cntAct > 0) {
        $out .= ',';
    }

    $out .= '{
                "id": ' . $rowAct['actid'] . ',
                "text": "' . $rowAct['actabbr'] . '",
                "leaf": false
                //"expanded": true,
                /*"loaded" : true*/';
    // * перебор групп
    if (count($groupList)) {
        $out .= ',
        "children": [';
        $cntGroup = 0;
        foreach ($groupList as $j => $rowGroup) {
            if ($rowGroup['actid'] == $rowAct['actid']) {
                if ($cntGroup > 0) {
                    $out .= ',';
                }
                $out .= '{
                    "id": "' . $rowAct['actid'] . '-' . $rowGroup['groupid'] . '",
                    "text": "Группа № ' . $rowAct['actnum'] . '.' . $rowGroup['groupnum'] . '",
                    "leaf": true,
                    //"expanded": true
                    "groupid": ' .$rowGroup['groupid'].',
                    /*"loaded" : true*/}';
                $cntGroup++;
            }
        }
        $out .= ']';
    }
    $out .= '}';
    $cntAct++;
}

$out .= ']}';
echo $out;


if ($mysqli)
    $mysqli->close();
?>