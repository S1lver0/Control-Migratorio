<?php
// Declaramos las variables de conexión
$ServerName = "-mysql..clever-cloud.com";
$Username = "";
$Password ="";
$NameBD = "bqpsx6amf5io0herhaig";

// Creamos la conexión con MySQL
$conex = new mysqli($ServerName, $Username, $Password, $NameBD);

// Revisamos la Conexión MySQL
if ($conex->connect_error) {
    die("Ha fallado la conexión: " . $conex->connect_error);
}
?>