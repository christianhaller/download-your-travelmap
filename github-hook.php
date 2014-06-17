<?php

// Use in the "Post-Receive URLs" section of your GitHub repo.

//if ( $_POST['payload'] ) {
exec( 'cd /var/www/christianhaller.com/subdomains/download-your-travelmap/ && git pull origin master',$output,$return );
echo $return;
var_dump($output);



if(function_exists('exec')) {
    echo "exec is enabled";
}

else {
    echo 'disabled';
}
//}

?>hi