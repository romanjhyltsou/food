<?php
$_POST = json_decode( file_get_contents("php://input"), true );  /*  для json */
echo var_dump($_POST);
/* берет данные которые пришли с клиента 
превращает их в строку и показывает 
их обратно на клиенте - response, который приходит от сервера */