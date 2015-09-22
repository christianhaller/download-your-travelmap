<?php
date_default_timezone_set("Europe/Berlin");
$files = scandir('../data', 1);
$newest_file = $files[0];
$newest_file = substr($newest_file,0,19);
$newest_file = str_replace('----',' ',$newest_file);
$newest_file = strtotime($newest_file);
$newest_file = time() - $newest_file;
$response  = array('ago' => time_since($newest_file));
header('Content-Type: application/json');
echo json_encode($response);

function time_since($since) {
    $chunks = array(
        array(31536000 , 'year'),
        array(2592000 , 'month'),
        array(604800, 'week'),
        array(86400 , 'day'),
        array(3600 , 'hour'),
        array(60 , 'minute'),
        array(1 , 'second')
    );

    for ($i = 0, $j = count($chunks); $i < $j; $i++) {
        $seconds = $chunks[$i][0];
        $name = $chunks[$i][1];
        if (($count = floor($since / $seconds)) != 0) {
            break;
        }
    }

    $print = ($count == 1) ? '1 '.$name : "$count {$name}s";
    return $print;
}