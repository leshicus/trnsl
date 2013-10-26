<?php
$extjs421_gray = '
	<script src="/ext-4.2.1/ext-debug-w-comments.js"></script>
	<script src="/ext-4.2.1/examples/shared/examples.js"></script>
	<link rel="stylesheet" href="/ext-4.2.1/resources/css/ext-all-gray.css">
	<link rel="stylesheet" type="text/css" href="/ext-4.2.1/examples/shared/example.css"/>
	<script src="/ext-4.2.1/locale/ext-lang-ru.js"></script>
';

$extjs421_neptune = '
	<link rel="stylesheet" type="text/css" href="../ext-4.2.1/resources/css/ext-all-neptune.css">
	<script type="text/javascript" src="../ext-4.2.1/ext-all-debug-w-comments.js"></script>
	<script type="text/javascript" src="../ext-4.2.1/locale/ext-lang-ru.js"></script>
	<script src="../ext-4.2.1/examples/shared/examples.js"></script>
	<link rel="stylesheet" type="text/css" href="../ext-4.2.1/examples/shared/example.css"/>
	<script src="/ext-4.2.1/locale/ext-lang-ru.js"></script>
';
$success = true;
$initPassword = 'init';
$initRole = 3;
$questionAmount = 3; // * число вопросов в билете

function _log($mysqli,$userid, $logtypeid, $parameter)
{
    $curdate = date('Y.m.d H:i');
    $sql = "
         insert into `log`
         (logdate, userid, parameter, logtypeid)
         values
         ('$curdate', '$userid', '$parameter', '$logtypeid')
        ";
    try {
        $res = $mysqli->query($sql);
    } catch (Exception $e) {
        $success = false;
    }
}
?>