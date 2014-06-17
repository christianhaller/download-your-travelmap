<?php

// Use in the "Post-Receive URLs" section of your GitHub repo.

if ( $_POST['payload'] ) {
shell_exec( 'cd /var/www/christianhaller.com/subdomains/download-your-travelmap/ && git reset --hard HEAD && git pull' );
}

?>hi