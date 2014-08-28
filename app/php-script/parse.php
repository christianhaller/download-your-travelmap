<?php
ob_start("ob_gzhandler");
include('iso.php');
date_default_timezone_set("Europe/Berlin");

$url = '';
$response = array('data' => array(), 'status' => 'error');


function parseStr($str, $start, $end)
{
    $startPos = strpos($str, $start);
    $result = substr($str, $startPos + strlen($start));
    $endPos = strpos($result, $end);
    $result = substr($result, 0, $endPos);

    if ($result === '') {
        //echo ('no result for '.$start.'' .$end.' in:'.$str);
        throw new Exception('no result for ' . $start . '' . $end . ' in:' . $str);
    }

    return $result;
}

try {
    if (isset($_REQUEST['url']) && $_REQUEST['url'] !== '') {
        $url = $_REQUEST['url'];
    } else {
        throw new Exception('no url');
    }


    $context = stream_context_create(array(
        'http' => array(
            'timeout' => 2.0
        )
    ));

    $urlParts = parse_url($url);

    if (strpos($urlParts['host'], 'www.tripadvisor.') === false) {
        throw new Exception('invalid url:' . $url);
    }


    // Datei runterladen, könnte schief gehen
    // http://stackoverflow.com/questions/6658859/how-to-stop-fopen-from-triggering-warning-when-attempting-to-open-an-invalid-unr
    $handle = @fopen($url, "r", false, $context);
    if (!$handle) {
        throw new Exception('cant reach ' . $url);
    }


    $str = '';
    while (!feof($handle)) {
        $line_of_text = fgets($handle);
        $str .= $line_of_text;
    }
    fclose($handle);


    $response['data']['username'] = parseStr($str, '<div class="memberTitle">', '<');
    $bodyElement = parseStr($str, '<body', '>');
    $response['data']['lang'] = parseStr($bodyElement, 'lang_', ' ');

    //Bildchen
    $response['data']['avatar'] = parseStr($str, '<div class="avatar"><img src="', '"');


    $placesStr = parseStr($str, '{"store":{', ',"modules.membercenter.model.FriendCount');


    $placesStr = '{' . $placesStr . '}';
    //echo $placesStr;
    // könnte schief gehen
    $json_a = json_decode($placesStr, true);


    if ($json_a === NULL) {
        throw new Exception('parse error');
    }


    $places = array();
    $isoArray = array_flip($iso);


    foreach ($json_a['modules.unimplemented.entity.LightWeightPin'] as $pin) {
        $locationArray = explode(',', $pin['name']);
        $country = ltrim($locationArray[sizeof($locationArray) - 1]);
        $city = $locationArray[0];

        $iso = '';
        if(isset($isoArray[$country])){
            $iso = $isoArray[$country];
        }




        $places[] = array(
            'country' => $country,
            'name' => $pin['name'],
            'city' => $city,
            'lat' => $pin['lat'],
            'lng' => $pin['lng'],
            'flags' => $pin['flags'],
            'iso' => $iso
        );


    }


    $json = json_encode($places);

    $url = date('Y-m-d----H:i:s') . '--' . md5($url) . '.csv';


    //file_put_contents('data/' . $url . '/' , $json);


    $response['data']['places'] = $places;
    $response['status'] = 'success';


    $fp = fopen('../data/' . $url, 'w');
    fputcsv($fp,array('lat','lon','name','been','notes'));
    foreach ($places as $key => $fields) {
        unset($fields['iso']);
        $str = $fields['name'];
        $flags = implode(',',$fields['flags']);
        //echo $fields['lat'].$fields['lng'];

        $row = array($fields['lat'],$fields['lng'],$str,$flags);

        //unset($fields['flags']);
        fputcsv($fp, $row);

    }
    fclose($fp);
    $filesize = human_filesize(filesize('../data/'.$url));
    $response['csv']['url'] = $url;
    $response['csv']['filesize'] = $filesize;
    response($response);


} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    response($response);

};

function response($response)
{
    if ($response['status'] !== 'success') {
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    }
    header('X-UA-Compatible: IE=edge,chrome=1');
    echo json_encode($response);
    ob_end_flush();
}



function human_filesize($bytes, $decimals = 2) {
    $sz = 'BKMGTP';
    $factor = floor((strlen($bytes) - 1) / 3);
    return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
}





