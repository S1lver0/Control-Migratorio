<?php
// Declaramos las variables de conexión
$ServerName = "bqpsx6amf5io0herhaig-mysql.services.clever-cloud.com";
$Username = "u3jy8btetduo65xc";
$Password ="ODzjGmTbkJoRqSRvJcEK";
$NameBD = "bqpsx6amf5io0herhaig";

// Creamos la conexión con MySQL
$conex = new mysqli($ServerName, $Username, $Password, $NameBD);

// Revisamos la Conexión MySQL
if ($conex->connect_error) {
    die("Ha fallado la conexión: " . $conex->connect_error);
}
?>