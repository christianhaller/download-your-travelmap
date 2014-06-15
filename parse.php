<?php

include('iso.php');

$url = '';
$response = array('data' => array(), 'status' => 'success');

try {
    if (isset($_POST['url']) && $_POST['url'] !== '') {
        $url = $_POST['url'];
    } else {
        throw new Exception('no url');
    }


    $context = stream_context_create(array(
        'http' => array(
            'timeout' => 2.0
        )
    ));

    $urlParts = parse_url($url);

    if ($urlParts['host'] !== 'www.tripadvisor.com') {
        throw new Exception('invalid url' . $url);

    }


    // Datei runterladen, könnte schief gehen
    $handle = fopen($url, "r", false, $context);
    if (!$handle) {
        throw new Exception('cant reach ' . $url);
    }


    $str = '';
    while (!feof($handle)) {
        $line_of_text = fgets($handle);
        $str .= $line_of_text;
    }
    fclose($handle);


    // Name parsen
    $startNameString = '<div class="memberTitle">';
    $startNamePosition = strpos($str, $startNameString);
    $username = substr($str, $startNamePosition + strlen($startNameString));
    $endNamePosition = strpos($username, '<');
    $username = substr($username, 0, $endNamePosition);

    $response['data']['username'] = $username;


    // Pins parsen
    $start = strpos($str, 'data =');
    $str = substr($str, $start + 7);
    $end = strpos($str, ',"modules.membercenter.model.FriendCount"');
    $str = substr($str, 0, $end - 1);
    $str .= '}}}';


    // könnte schief gehen
    $json_a = json_decode($str, true);
    if ($json_a === NULL) {
        throw new Exception('parse error');


    }


    $places = array();

    $isoArray = array_flip($iso);


    foreach ($json_a['store']['modules.unimplemented.entity.LightWeightPin'] as $pin) {
        $locationArray = explode(',', $pin['name']);
        $country = ltrim($locationArray[sizeof($locationArray) - 1]);
        $city = $locationArray[0];
        $iso = $isoArray[$country];

        if ($iso === null) {
            $iso = '';
            throw new Exception($country . ' not in ISO' . "\n");

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
    $url = urlencode($url);

    $path = 'data/' . $url;
    if (!is_dir($path)) {
        mkdir($path);
    }

    file_put_contents('data/' . $url . '/' . time(), $json);
    $response['data']['places'] = $places;

    response($response);


} catch (Exception $e) {
    response($response);

};

function response($response)
{

    header('Content-Type: application/json');
    echo json_encode($response);
}





