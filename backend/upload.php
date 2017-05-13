<?php

// print_r($_FILES);
// print_r($_POST);
$response = [];
$response['tes'] = 'revze';

$file = $_FILES['submitted']['name'];
$tmp_file = $_FILES['submitted']['tmp_name'];

move_uploaded_file($tmp_file,'../photo/'.$file);

echo json_encode($response);
?>
