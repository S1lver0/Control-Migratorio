<?php
include("conectarbd.php");
// Obtener el JSON enviado en la solicitud POST
$jsonData = json_decode(file_get_contents('php://input'), true);
$idRegi = uniqid();
echo $idRegi;

//obtener registro
$fecha = $jsonData['ini']['fecha'];
$destino = $jsonData['ini']['destino'];
$poliza = $jsonData['ini']['poliza'];
$procedencia = $jsonData['ini']['procedencia'];



//llenado de tabla conductor
$Di_con = $jsonData['driver']['di'];
$brevete = $jsonData['driver']['brevete'];
$domicilio = $jsonData['driver']['domicilio'];
$fecha_na = $jsonData['driver']['fecha_na'];
$nacionalidad_conduc = $jsonData['driver']['nacionalidad'];
$nombre_conduc = $jsonData['driver']['nombre'];
$profesion_conduc = $jsonData['driver']['profesion'];
$scpp = $jsonData['driver']['profesion'];


//llenamos la tabla di 
$tipo_di = "1";
$sql = "INSERT INTO di (Numero,Tipo) VALUES ('$Di_con','$tipo_di')";

if (mysqli_query($conex, $sql)) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar datos: " . mysqli_error($conex);
}
/////////////////////////////////////////////////////////////////

$sql = "INSERT INTO conductor (Di_conductor, Nombre, FNam, domicilio, pais, profesion_Id, scpp, Brevete) VALUES ('$Di_con','$nombre_conduc','$fecha_na','$domicilio','$nacionalidad_conduc','$profesion_conduc','$scpp','$brevete')";


if (mysqli_query($conex, $sql)) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar datos: " . mysqli_error($conex);
}


//llenado de tabla vehiculo

$año = $jsonData['car']['año'];
$chasis = uniqid();
$marca = uniqid();
$modelo = uniqid();
$motor = uniqid();
$pais = $jsonData['car']['pais'];
$placa = $jsonData['car']['placa'];
$tipo = $jsonData['car']['tipo'];



//tabla modelo
$modelo_name = $jsonData['car']['modelo'];
$sql = "INSERT INTO modelo (Id,Nombre) VALUES ('$modelo','$modelo_name')";
if (mysqli_query($conex, $sql)) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar datos: " . mysqli_error($conex);
}



$motor_name = $jsonData['car']['motor'];
$sql = "INSERT INTO motor (Id,Nombre) VALUES ('$motor','$motor_name')";
if (mysqli_query($conex, $sql)) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar datos: " . mysqli_error($conex);
}

//tabla marca
$marca_name = $jsonData['car']['marca'];
$sql = "INSERT INTO marca (Id,Nombre) VALUES ('$marca','$marca_name')";
if (mysqli_query($conex, $sql)) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar datos: " . mysqli_error($conex);
}
//tabla Chasis
$chasis_name = $jsonData['car']['chasis'];
$sql = "INSERT INTO chasis (Id,Nombre) VALUES ('$chasis','$chasis_name')";
if (mysqli_query($conex, $sql)) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar datos: " . mysqli_error($conex);
}


$sql = "INSERT INTO vehiculo (Placa, Anio, Modelo, Motor, Marca, Chasis, Tipo_Ve, Pais) VALUES ('$placa','$año','$modelo','$motor','$marca','$chasis','$tipo','$pais')";


if (mysqli_query($conex, $sql)) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar datos: " . mysqli_error($conex);
}



//validar cantidad pasajeros
$pasajeros_cantidad = $jsonData['cantidad_pasajeros'];
if (is_string($pasajeros_cantidad)) {
    $pasajeros_cantidad = intval($pasajeros_cantidad);
}



//llenado de tabla registro 
$sql = "INSERT INTO registro (codigo, fecha, procedencia, destino, vehiculo, poliza, conductor) VALUES ('$idRegi','$fecha','$procedencia','$destino','$placa','$poliza','$Di_con')";
// Ejecutar la sentencia INSERT
if (mysqli_query($conex, $sql)) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar datos: " . mysqli_error($conex);
}




for ($i = 0; $i < $pasajeros_cantidad; $i++) {
    //llenamos la tabla pasajero
    $DI_Numero = $jsonData['pasajeros'][$i]['di'];
    $pa_estado = $jsonData['pasajeros'][$i]['select_estado'];
    $pa_fecha = $jsonData['pasajeros'][$i]['fecha'];
    $pa_nacionalidad = $jsonData['pasajeros'][$i]['select_nacionalidad'];
    $pa_nombre = $jsonData['pasajeros'][$i]['nombre'];
    $pa_profesion = $jsonData['pasajeros'][$i]['select_profesion'];
    //llenamos la tabla di 
    $tipo_di = $jsonData['pasajeros'][$i]['tipoDi'];
    $sql = "INSERT INTO di (Numero,Tipo) VALUES ('$DI_Numero','$tipo_di')";

    if (mysqli_query($conex, $sql)) {
        echo "Datos insertados correctamente.";
    } else {
        echo "Error al insertar datos: " . mysqli_error($conex);
    }


    $sql = "INSERT INTO pasajeros (DI_Numero, Nombre, FNam, estado_c, pais, profesion_Id) VALUES ('$DI_Numero','$pa_nombre','$pa_fecha','$pa_estado','$pa_nacionalidad','$pa_profesion')";


    if (mysqli_query($conex, $sql)) {
        echo "Datos insertados correctamente.";
    } else {
        echo "Error al insertar datos: " . mysqli_error($conex);
    }

    //llenamos la tabla detalle
    $id_detalle = uniqid();
    $sql = "INSERT INTO detalle (id,registro,pasajeros) VALUES ('$id_detalle','$idRegi','$DI_Numero')";

    if (mysqli_query($conex, $sql)) {
        echo "Datos insertados correctamente.";
    } else {
        echo "Error al insertar datos: " . mysqli_error($conex);
    }

}



?>