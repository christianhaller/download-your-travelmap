<?php

// Use in the "Post-Receive URLs" section of your GitHub repo.

//if ( $_POST['payload'] ) {
exec( 'git pull origin master',$output,$return );
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

<?php phpinfo();?>