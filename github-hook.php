<?php

// Use in the "Post-Receive URLs" section of your GitHub repo.

if ( $_POST['payload'] ) {
shell_exec("cd /var/www/christianhaller.com/subdomains/download-your-travelmap && /usr/bin/git pull 2>&1");

}

?>hi
