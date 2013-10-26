<?
require_once("../db_connect.php");
require_once('../include.php');

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'read':
        $dateFrom = $_REQUEST['dateFindFrom'];
        $dateTo = $_REQUEST['dateFindTo'];
        $comboLogtype = $_REQUEST['comboLogtype'];
        $where = "";
        if($comboLogtype)
            $where.= " and g.logtypeid = '" . $comboLogtype . "' ";
        if($dateFrom)
            $where.= " and DATE_FORMAT(logdate,'%d.%m.%Y') >= DATE_FORMAT('" . $dateFrom . "','%d.%m.%Y') ";
        if($dateTo)
            $where.= " and DATE_FORMAT(logdate,'%d.%m.%Y') <= DATE_FORMAT('" . $dateTo . "','%d.%m.%Y') ";
        if(!$dateFrom && !$dateTo)
            $where.= " and DATE_FORMAT(logdate,'%d.%m.%Y') = DATE_FORMAT(CURDATE(),'%d.%m.%Y') ";

        $sql = "select
                  g.logid,
                  DATE_FORMAT(g.logdate, '%d.%m.%Y %H:%i') as logdate,
                  g.userid,
                  g.parameter,
                  g.logtypeid,
                  CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio,
                  t.logtypename
		        from `log` g,
		            `user` u,
		            `logtype` t
		        where u.userid = g.userid
		        and t.logtypeid = g.logtypeid ".$where.
		        " order by logdate, fio, logtypename";
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
    default:
        echo "default";
};

if ($mysqli)
    $mysqli->close();

?>
