<?php

// Use in the "Post-Receive URLs" section of your GitHub repo.

//if ( $_POST['payload'] ) {
echo shell_exec("/usr/bin/git pull 2>&1");




if(function_exists('exec')) {
    echo "exec is enabled";
}

else {
    echo 'disabled';
}
//}

?>hi

<?php phpinfo();?>