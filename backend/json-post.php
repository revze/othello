<?php

$response = [];
$response['name'] = $_POST['name'];
$response['nickname'] = $_POST['nickname'];

echo json_encode($response);

?>
