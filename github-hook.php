<?php

// Use in the "Post-Receive URLs" section of your GitHub repo.

//if ( $_POST['payload'] ) {
$return = shell_exec( 'cd /var/www/christianhaller.com/subdomains/download-your-travelmap/ && git pull origin master' );
echo $return;
//}

?>hi