<?php
    $response = '';
    if (isset($_GET['url']) && $_GET['url'] !== ''){
    $url = $_GET['url'];
    include('parse.php');
}?>

<!DOCTYPE html>
<html>
<head>
    <link type="text/css" rel="stylesheet" href="/css/css.css"/>

    <title><?php echo $page->title;?></title>
</head>
<body>
    <?php if($response!==''):?>
    <?php echo $response;?>
        <h1><?php echo $page->title;?></h1>
    <div id="world-map"></div>
    <textarea><?php echo $json;?></textarea>

    <?php else: ?>
<h1>Give me your Tridadvisor map</h1>
<form action="">
    <input value="" name="url" type="text"/>
</form>
 <?php endif;?>

<script src="/js/jquery-1.11.1.min.js"></script>
<script src="/js/jquery-jvectormap-1.2.2.min.js"></script>
<script src="/js/jquery-jvectormap-world-mill-en.js"></script>
<script src="/js/custom.js"></script>
</body>
</html>



