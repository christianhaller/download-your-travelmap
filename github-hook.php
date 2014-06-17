<?php

// Use in the "Post-Receive URLs" section of your GitHub repo.

//if ( $_POST['payload'] ) {
echo shell_exec("cd /var/www/christianhaller.com/subdomains/download-your-travelmap && /usr/bin/git pull 2>&1");




if(function_exists('exec')) {
    echo "exec is enabled";
}

else {
    echo 'disabled';
}
//}

?>hi

<?php phpinfo();?>