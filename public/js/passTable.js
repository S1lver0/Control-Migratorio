//objetos global
var pasajeros = [];
var car;
var ini;
var driver;
//// global
var IdQR;
var conteo = 0;
//////////

function agregarPasajero() {
  var nombre_apellidos = document.getElementById("id_Nombre_P").value;
  var nacionalidad = document.getElementById("id_Nacionalidad_P").textContent;
  var estadoCivil = document.getElementById("id_EstadoCivil_P").value;
  var profesion = document.getElementById("id_Profesion_P").value;
  var DNI = document.getElementById("id_DNI_P").value;
  var Numero_DNI = document.getElementById("id_NumeroDNI_P").value;
  var nacimiento = document.getElementById("id_Nacimiento_P").value;
  var campos = [
    nombre_apellidos,
    nacionalidad,
    estadoCivil,
    profesion,
    DNI,
    Numero_DNI,
    nacimiento,
  ];
  // Expresión regular para permitir ciertos caracteres
  var nombreRegex = /^[a-zA-Z\s]*$/;
  var numeroDNIRegex = /^[0-9]+$/;
  var numeroPasExRegex = /^[a-zA-Z0-9]+$/;
  //alert(DNI);
  //alert(nacimiento);
  if (!nombreRegex.test(nombre_apellidos)) {
    mensaje =
      "El campo Nombre y Apellidos solo debe contener letras y espacios.";
    mensaje_Adv(mensaje);
    return;
  }
  if (
    DNI === "dni" &&
    (!numeroDNIRegex.test(Numero_DNI) || Numero_DNI.length !== 8)
  ) {
    if (Numero_DNI.length !== 8) {
      //alert('El campo Número DNI solo debe contener números.');
      mensaje =
        "El campo Número DNI debe contener exactamente 8 dígitos numéricos.";
      document.getElementById("id_NumeroDNI_P").value = "";
    } else {
      mensaje = "El campo Número DNI solo debe contener números.";
      //alert('El campo Número DNI debe contener exactamente 8 dígitos numéricos.');
    }
    mensaje_Adv(mensaje);
    return;
  }
  if (
    DNI === "carnet-extranjeria" &&
    (!numeroPasExRegex.test(Numero_DNI) || Numero_DNI.length !== 12)
  ) {
    if (Numero_DNI.length !== 12) {
      mensaje =
        "El campo Número Carnet de extranjeria debe contener exactamente 12 caracteres.";
      document.getElementById("id_NumeroDNI_P").value = "";
      //alert('El campo Número Carnet de extranjeria solo debe contener números y letras.');
    } else {
      //alert('El campo Número Carnet de extranjeria debe contener exactamente 12 dígitos.');
      mensaje =
        "El campo Número Carnet de extranjeria solo debe contener números y letras.";
    }
    mensaje_Adv(mensaje);
    return;
  }
  if (
    DNI === "pasaporte" &&
    (!numeroPasExRegex.test(Numero_DNI) || Numero_DNI.length !== 12)
  ) {
    if (Numero_DNI.length !== 12) {
      mensaje =
        "El campo Número Pasarpote debe contener exactamente 8 dígitos numéricos.";
      document.getElementById("id_NumeroDNI_P").value = "";
      //alert('El campo Número Pasarpote solo debe contener números y letras.');
    } else {
      mensaje =
        "El campo Número Pasarpote solo debe contener números y letras.";
      //alert('El campo Número Pasarpote debe contener exactamente 8 dígitos numéricos.');
    }
    mensaje_Adv(mensaje);
    return;
  }
  for (var i = 0; i < campos.length; i++) {
    if (campos[i] === "" || campos[i] === "Seleccione un pais") {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Por favor, complete todos los campos antes de agregar el pasajero.",
      });
      return;
    }
  }
  // Aquí puedes realizar las acciones
  Swal.fire({
    icon: "success",
    title: "Registro aceptado",
    text: "Se agregó el pasajero exitosamente.",
  });
  limpiarCampos();

  ///convertir los select a numeros
  //--para nacionalidad
  var select_nacionalidad;
  switch (campos[1]) {
    case "Perú":
      select_nacionalidad = 1;
      break;
    case "Chile":
      select_nacionalidad = 2;
      break;
    case "Venezuela":
      select_nacionalidad = 3;
      break;
    case "Brasil":
      select_nacionalidad = 4;
      break;
    case "Ecuador":
      select_nacionalidad = 5;
      break;
  }

  //--para profesion
  var select_profesion;
  switch (campos[3]) {
    case "Actor/actriz":
      select_profesion = 1;
      break;
    case "Administrador/a de empresas":
      select_profesion = 2;
      break;
    case "Agricultor/a":
      select_profesion = 3;
      break;
    case "Arquitecto/a":
      select_profesion = 4;
      break;
  }

  //--para estado Civil
  var select_estado;
  switch (campos[2]) {
    case "Soltero":
      select_estado = 1;
      break;
    case "Casado":
      select_estado = 2;
      break;
    case "Conviviente":
      select_estado = 3;
      break;
    case "Viudo":
      select_estado = 4;
      break;
    case "Divorciado":
      select_estado = 4;
      break;
    case "Separado":
      select_estado = 4;
      break;
  }

  var tipoDi;
  switch (DNI) {
    case "dni":
      tipoDi = 1;
      break;
    case "carnet-extranjeria":
      tipoDi = 2;
      break;
    case "pasaporte":
      tipoDi = 3;
      break;
    default:
      tipoDi = 1;
      break;
  }

  //--
  pass = {
    nombre: campos[0],
    nacionalidad: campos[1],
    estado: campos[2],
    profesion: campos[3],
    di: campos[5],
    fecha: campos[6],
    select_estado: select_estado,
    select_nacionalidad: select_nacionalidad,
    select_profesion: select_profesion,
    tipoDi: tipoDi,
  };
  pasajeros.push(pass);
  addTable();
  conteo++;
}

function addTable() {
  var indice = pasajeros.length; // calculamos el tamaño para saber el ultimo que se agrego
  indice = indice - 1;
  var tbody = document.getElementById("addTable");
  tbody.innerHTML += `<tr>
                          <td>${pasajeros[indice].nombre}</td>
                          <td>${pasajeros[indice].nacionalidad}</td>
                          <td>${pasajeros[indice].estado}</td>
                          <td>${pasajeros[indice].profesion}</td>
                          <td>${pasajeros[indice].fecha}</td>
                          <td>${pasajeros[indice].di}</td>
                          <td>
                              <button onclick="deleteRow(this)">
                                  <i class="fa-solid fa-trash-can" style="color: #de3112;"></i>
                              </button>
                          </td>
                      </tr>`;
}

function deleteRow(button) {
  var row = button.parentNode.parentNode; //obtenemos el tr por medio de los padres de los botones de elminado
  var cells = row.getElementsByTagName("td"); //seleccionamos todos los td
  var nombre = cells[0].innerText; //obtenemos el nombre de la fila
  var di = cells[5].innerText; //obtenemos el di

  // Borrar la fila
  for (let i = 0; i < pasajeros.length; i++) {
    if (pasajeros[i].di == di) {
      pasajeros.splice(i, 1);
      break;
    }
  }
  row.remove();
  //mostrando
  Swal.fire({
    icon: "success",
    title: "Eliminar",
    text: `Se elimino el pasajero "${nombre}"`,
  });

  console.log(pasajeros);
  conteo--;
}

function deleteAllTable() {
  var tbody = document.getElementById("addTable");
  tbody.innerHTML = "";
  pasajeros = [];
  console.log(pasajeros);
  conteo = 0;
}

function limpiarCampos() {
  document.getElementById("id_Nombre_P").value = "";
  document.getElementById("id_Nacionalidad_P").textContent =
    "Seleccione un pais";
  document.getElementById("id_EstadoCivil_P").value = "";
  document.getElementById("id_Profesion_P").value = "";
  document.getElementById("id_DNI_P").value = "";
  document.getElementById("id_NumeroDNI_P").value = "";
  document.getElementById("id_NumeroDNI_P").disabled = true;
  document.getElementById("id_Nacimiento_P").value = "";
}

function mensaje_Adv(mensaje_dv) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: mensaje_dv,
  });
}

function valiAll() {
  //VALIDAR CABECERA
  var cabecera = document.getElementById("cabe");

  if (
    cabecera.querySelector("#Destino").value == "" ||
    cabecera.querySelector("#Procedencia").value == ""
  ) {
    mensaje_Adv(
      "Por favor, complete todos los campos requeridos antes de generar ficha"
    );
    return;
  }
  //Validar Vehiculo
  var Vehiculo = document.getElementById("vehi1");
  if (
    Vehiculo.querySelector("#Tipo").value == "" ||
    Vehiculo.querySelector("#Pais_Vehiculo").textContent ==
      "Seleccione un pais" ||
    Vehiculo.querySelector("#Marca").value == "" ||
    Vehiculo.querySelector("#Modelo").value == "" ||
    Vehiculo.querySelector("#Año").value == "" ||
    Vehiculo.querySelector("#Motor").value == "" ||
    Vehiculo.querySelector("#Chasis").value == "" ||
    Vehiculo.querySelector("#Placa").value == ""
  ) {
    mensaje_Adv(
      "Por favor, complete todos los campos requeridos antes de generar ficha"
    );
    return;
  }
  //Validar Conductor
  var Conductor = document.getElementById("driver");
  console.log(Conductor.querySelector("#Fecha_Nacimiento").value);
  if (
    Conductor.querySelector("#Pais_Conductor").textContent ==
      "Seleccione un pais" ||
    Conductor.querySelector("#MombreC").value == "" ||
    Conductor.querySelector("#Domicilio").value == "" ||
    Conductor.querySelector("#Profesion1").value == "" ||
    Conductor.querySelector("#Brevete").value == "" ||
    Conductor.querySelector("#Fecha_Nacimiento").value == "" ||
    Conductor.querySelector("#sc_pp").value == "" ||
    Conductor.querySelector("#Di").value == ""
  ) {
    mensaje_Adv(
      "Por favor, complete todos los campos requeridos antes de generar ficha"
    );
    return;
  }
  if (conteo == 0) {
    mensaje_Adv("Tiene que ingresar al menos un pasajero");
  } else {
    addObj();
  }
}

function addObj() {
  //cabecera
  var cabecera = document.getElementById("cabe");
  var poliza = "no tiene";
  if (cabecera.querySelector("#poliza").value != "") {
    var poliza = cabecera.querySelector("#poliza").value;
  }
  ini = {
    fecha: cabecera.querySelector("#fechaActual").value,
    destino: cabecera.querySelector("#Destino").value,
    procedencia: cabecera.querySelector("#Procedencia").value,
    poliza: poliza,
  };
  //vehiculo
  var Vehiculo = document.getElementById("vehi1");
  var Vehi_tipo;
  console.log(Vehiculo.querySelector("#Tipo").value);
  switch (Vehiculo.querySelector("#Tipo").value) {
    case "auto":
      Vehi_tipo = 1;
      break;
    case "autobus":
      Vehi_tipo = 2;
      break;
    case "moto":
      Vehi_tipo = 3;
      break;
    case "camioneta":
      Vehi_tipo = 4;
      break;
    case "camion":
      Vehi_tipo = 5;
      break;
  }

  var Vehi_Pais;

  switch (Vehiculo.querySelector("#Pais_Vehiculo").textContent) {
    case "Perú":
      Vehi_Pais = 1;
      break;
    case "Chile":
      Vehi_Pais = 2;
      break;
    case "Venezuela":
      Vehi_Pais = 3;
      break;
    case "Brasil":
      Vehi_Pais = 4;
      break;
    case "Ecuador":
      Vehi_Pais = 5;
      break;
  }

  car = {
    tipo: Vehi_tipo,
    marca: Vehiculo.querySelector("#Marca").value,
    modelo: Vehiculo.querySelector("#Modelo").value,
    año: Vehiculo.querySelector("#Año").value,
    motor: Vehiculo.querySelector("#Motor").value,
    chasis: Vehiculo.querySelector("#Chasis").value,
    placa: Vehiculo.querySelector("#Placa").value,
    pais: Vehi_Pais,
  };

  //Conductor
  var Conductor = document.getElementById("driver");
  var conductor_Profesion;
  switch (Conductor.querySelector("#Profesion1").value) {
    case "Actor/actriz":
      conductor_Profesion = 1;
      break;
    case "Administrador/a de empresas":
      conductor_Profesion = 2;
      break;
    case "Agricultor/a":
      conductor_Profesion = 3;
      break;
    case "Arquitecto/a":
      conductor_Profesion = 4;
      break;
  }

  var conductor_Pais;
  switch (Conductor.querySelector("#Pais_Conductor").textContent) {
    case "Perú":
      conductor_Pais = 1;
      break;
    case "Chile":
      conductor_Pais = 2;
      break;
    case "Venezuela":
      conductor_Pais = 3;
      break;
    case "Brasil":
      conductor_Pais = 4;
      break;
    case "Ecuador":
      conductor_Pais = 5;
      break;
  }

  driver = {
    nombre: Conductor.querySelector("#MombreC").value,
    domicilio: Conductor.querySelector("#Domicilio").value,
    profesion: conductor_Profesion,
    nacionalidad: conductor_Pais,
    brevete: Conductor.querySelector("#Brevete").value,
    fecha_na: Conductor.querySelector("#Fecha_Nacimiento").value,
    scpp: Conductor.querySelector("#sc_pp").value,
    di: Conductor.querySelector("#Di").value,
  };

  console.log(ini);
  console.log(car);
  console.log(driver);
  GenerarJson();
}

function GenerarJson() {
  var ObjAll = {
    pasajeros: pasajeros,
    car: car,
    driver: driver,
    ini: ini,
    cantidad_pasajeros: conteo,
  };
  console.log(ObjAll);

  var IdQR = "";

  // Realizar la solicitud POST
  fetch("../src/json.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ObjAll),
  })
    .then((response) => response.text())
    .then((data) => {
      // Imprimir la respuesta del servidor(servidor retorna ID UNICO )
      IdQR = data;
      console.log(IdQR);
      //BLOEKAR BOTON
      document.getElementById("btn_eliminar").disabled = true;
      document.getElementById("btn_agregarPasajero").disabled = true;
      document.getElementById("btn_generarFicha").disabled = true;
      generarFichaPDF(ObjAll, IdQR);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//////////////////////////GENERAR PDF CON CODIGO qR//////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
// pasar imagenes a base64
var fondoFicha =
  "data:image/png;base64,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87Z3trrg1OYvhnmfq85PEFXRzpOMbwaZ100x/DTYuf94UqWum2L06e5wxvqZl1c0aJqmTTKelM1sOmur67GJw2/MIZeYR3hRM8K8/c7D7ebtvUdjt/PvPEq7aZLfZad933rMGphHMCNgYvNv+HkCABANAIBoAABEAwAgGgAA0QAAiAYAANEAAIgGAEA0AACiAQAQDQCAaAAARAMAgGgAAEQDACAaAADRAACIBgBANAAAogEAQDQAAKIBABANAIBoAABEAwAgGgAA0QAAIBoAANEAAIgGAEA0AACiAQAQDQCAaAAAEA0AgGgAAEQDACAaAADRAACIBgBANAAAiAYAQDQAAKIBABANAIBoAABEAwAgGgAARAMAIBoAANEAAIgGAEA0AACiAQAQDQAAogEAEA0AgGgAAEQDACAaAADRAACIBgAA0QAAiAYAQDQAAKIBABANAIBoAABEAwCAaAAARAMAIBoAANEAAIgGAEA0AACiAQBANAAAogEAEA0AgGgAAEQDACAaAADRAAAgGgAA0QAAiAYAQDQAAKIBABANAIBoAAAQDQCAaAAARAMAIBoAANEAAIgGAEA0AACIBgBANAAAogEAEA0AgGgAAEQDACAaAABEAwAgGgAA0QAAiAYAQDQAAKIBABANAACiAQAQDQCAaAAARAMAIBoAANEAAIgGAADRAACIBgBANAAAogEAEA0AgGgAAEQDAIBoAABEAwAgGgAA0QAAiAYAQDQAAKIBAEA0AACiAQAQDQCAaAAARAMAIBoAANEAACAaAADRAACIBgBANAAAogEAEA0AgGgAABANAIBoAABEAwAgGgAA0QAAiAYAQDQAAIgGAEA0AACiAQAQDQCAaAAARAMAIBoAAEQDACAaAADRAACIBgBANAAAogEAEA0AAKIBABANAIBoAABEAwAgGgAA0QAAiAYAANEAAIgGAEA0AACiAQAQDQCAaAAARAMAgGgAAEQDACAaAADRAACIBgBANAAAogEAQDQAAKIBABANAIBoAABEAwAgGgAA0QAAIBoAANEAAIgGAEA0AACiAQAQDQCAaAAAEA0AgGgAAEQDACAaAADRAACIBgBANAAAiAYAQDQAAKIBABANAIBoAABEAwAgGgAARAMAIBoAANEAAIgGAEA0AACiAQAQDQAAogEAEA0AgGgAAEQDACAaAADRAACIBgAA0QAAiAYAQDQAAKIBABANAIBoAABEAwCAaAAARAMAIBoAANEAAIgGAEA0AACiAQBANAAAogEAEA0AgGgAAEQDACAaAADR4CMAAEQDACAaAADRAACIBgBANAAAogEAQDQAAKIBABANAIBoAABEAwAgGgAA0QAAIBoAANEAAIgGAEA0AACiAQAQDQCAaAAAEA0AgGgAAEQDACAaAADRAACIBgBANAAAiAYAQDQAAKIBABANAIBoAABEAwAgGgAARAMAIBoAANEAAIgGAEA0AACiAQAQDQAAogEAEA0AgGgAAEQDACAaAADRAACIBgAA0QAAiAYAQDQAAKIBABANAIBoAABEAwCAaAAARAMAIBoAANEAAIgGAEA0AACiAQBANAAAogEAEA0AgGgAAEQDACAaAADRAAAgGgAA0QAAiAYAQDQAAKIBABANAIBoAAAQDQCAaAAARAMAIBoAANEAAIgGAEA0AACIBgBANAAAogEAEA0AgGgAAEQDACAaAABEAwAgGgAA0QAAiAYAQDQAAKIBABANAACiAQAQDQCAaAAARAMAIBoAANEAAIgGAADRAACIBgBANAAAogEAEA0AgGgAAEQDAIBoAABEAwAgGgAA0QAAiAYAQDQAAKIBAEA0AACiAQAQDQCAaAAARAMAIBoAANEAACAaAADRAACIBgBANAAAogEAEA0AgGgAABANAIBoAABEAwAgGgAA0QAAiAYAQDQAAIgGAEA0AACiAQAQDQCAaAAARAMAIBoAAEQDACAaAADRAACIBgBANAAAogEAEA0AAKIBABANAIBoAABEAwAgGgAA0QAAiAYAANEAAIgGAEA0AACiAQAQDQCAaAAARAMAgGgAAEQDACAaAADRAACIBgBANAAAogEAQDQAAKIBABANAIBoAABEAwAgGgAA0QAAIBoAANEAAIgGAEA0AACiAQAQDQCAaAAAEA0AgGgAAEQDACAaAADRAACIBgBANAAAiAYAQDQAAKIBABANAIBoAABEAwAgGgAARAMAIBoAANEAAIgGAEA0AACiAQAQDQAAogEAEA0AgGgAAEQDACAaAADRAACIBgAA0QAAiAYAQDQAAKIBABANAIBoAABEAwCAaAAARAMAIBoAANEAAIgGAEA0AACiAQBANAAAogEAEA0AgGgAAEQDACAaAADRAAAgGgAA0QAAiAYAQDQAAKIBABANAIBo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AADRAACIBgBANAAAogEAEA0AgGgAAEQDAIBoAABEAwAgGgAA0QAAiAYAQDQAAKIBAEA0AACiAQAQDQCAaAAARAMAIBoAANEAACAaAADRAACIBgBANAAAogEAEA0AgGgAABANAIBoAABEAwAgGgAA0QAAiAYAQDQAAIgGAEA0AACiAQAQDQCAaAAARAMAIBoAAEQDACAaAADRAACIBgBANAAAogEAEA0AAKIBABANAIBoAABEAwAgGgAA0QAAiAYAANEAAIgGAEA0AACiAQAQDQCAaAAARAMAgGgAAEQDACAaAADRAACIBgBANAAAogEAQDQAAKIBABANAIBoAABEAwAgGgAA0QAAIBoAANEAAIgGAEA0AACiAQAQDQCAaAAAEA0AgGgAAEQDACAaAADRAACIBgBANAAAiAYAQDQAAKIBABANAIBoAABEAwAgGgAARAMAIBoAANEAAIgGAEA0AACiAQAQDQAAogEAEA0AgGgAAEQDACAaAADRAACIBgAA0QAAiAYAQDQAAKIBABANAIBoAABEAwCAaAAARAMAIBoAANEAAIgGAEA0AACiAQBANAAAogEAEA0AgGgAAEQDACAaAADRAAAgGgAA0QAAiAYAQDQAAKIBABANAIBoAAAQDQCAaAAARAMAIBoAANEAAIgGAEA0AACIBgBANAAAogEAEA0AgGgAAEQDACAaAABEAwAgGgAA0QAAiAYAQDQAAKIBABANAACiAQAQDQCAaAAARAMAIBoAANEAAIgGAADRAACIBgBANAAAogEAEA0AgGgAAESDjwAAEA0AgGgAAEQDACAaAADRAACIBgAA0QAAiAYAQDQAAKIBABANAIBoAABEAwCAaAAARAMAIBoAANEAAIgGAEA0AACiAQBANAAAogEAEA0AgGgAAEQDACAaAADRAAAgGgAA0QAAiAYAQDQAAKIBABANAIBoAAAQDQCAaAAARAMAIBoAANEAAIgGAEA0AACIBgBANAAAogEAEA0AgGgAAEQDACAaAABEAwAgGgAA0QAAiAYAQDQAAKIBABANAACiAQAQDQCAaAAARAMAIBoAANEAAIgGAADRAACIBgBANAAAogEAEA0AgGgAAEQDAIBoAABEAwAgGgAA0QAAiAYAQDQAAKIBAEA0AACiAQAQDQCAaAAARAMAIBoAANEAACAaAADRAACIBgBANAAAogEAEA0AgGgAABANAIBoAABEAwAgGgAA0QAAiAYAQDQAAIgGAEA0AACiAQAQDQCAaAAARAMAIBoAAEQDACAaAADRAACIBgBANAAAogEAEA0AAKIBABANAIBoAABEAwAgGgAA0QAAiAYAANEAAIgGAEA0AACiAQAQDQCAaAAARAMAgGgAAEQDACAaAADRAACIBgBANAAAogEAQDQAAKIBABANAIBoAABEAwAgGgAA0QAAIBoAANEAAIgGAEA0AACiAQAQDQCAaAAAEA0AgGgAAEQDACAaAADRAACIBgBANAAAiAYAQDQAAKIBABANAIBoAABEAwAgGgAARAMAIBoAANEAAIgGAEA0AACiAQAQDQAAogEAEA0AgGgAAEQDACAaAADRAACIBgAA0QAAiAYAQDQAAKIBABANAIBoAABEAwCAaAAARAMAIBoAANEAAIgGAEA0AACiAQBANAAAogEAEA0AgGgAAEQDACAaAADRAAAgGgAA0QAAiAYAQDQAAKIBABANAIBoAAAQDQCAaAAARAMAIBoAANEAAIgGAEA0AACIBgBANAAAogEAEA0AgGgAAEQDACAaAABEAwAgGgAA0QAAiAYAQDQAAKIBABANAACiAQAQDQCAaAAARAMAIBoAANEAAIgGAADRAACIBgBANAAAogEAEA0AgGgAAEQDAIBoAH6WhY8AXrj/PMVioDnwwQLAk7spf/9oAAD+PH6eAABEAwAgGgAA0QAAiAYAQDQAAKIBAEA0AACiAQAQDQCAaAAARAMAIBoAANEAACAaAADRAACIBgBANAAAogEAEA0AgGgAABANAIBoAABEAwAgGgAA0QAAiAYAQDQAAIgGAEA0AACiAQAQDQCAaAAARAMAIBoAAEQDACAaAADRAACIBgBANAAAogEAEA0AAKIBABANAIBoAABEAwAgGgAA0QAAiAYAANEAAIgGAEA0AACiAQAQDQCAaAAARAMAgGgAAEQDACAaAADRAACIBgBANAAAogEAQDQAAKIBABANAIBoAABEAwAgGgAA0QAAIBoAANEAAIgGAEA0AACiAQAQDQCAaAAAEA0AgGgAAEQDACAaAIBn7r9P8aTHPlcAeHKj8g+IhjemIwD8cf6z8BkAAN/APg0AgGgAAEQDACAaAADRAACIBgBANAAAiAYAQDQAAKIBABANAIBoAABEAwAgGgAARAMAIBoAANEAAIgGAEA0AACiAQAQDQAAogEAEA0AgGgAAEQDACAaAADRAACIBgAA0QAAiAYAQDQAAKIBABANAIBoAABEAwCAaAAARAMAIBoAANEAAIgGAEA0AACiAQBANAAAogEAEA0AgGgAAEQDACAaAADRAAAgGgAA0QAAiAYAQDQAAKIBABANAIBoAAAQDQCAaAAARAMAIBoAANEAAIgGAEA0AACIBgBANAAAogEAEA0AgGgAAEQDACAaAABEAwAgGgAA0QAAiAYAQDQAAKIBABANAACiAQAQDQDAk/jvkzxrc+CTBYAnd1P+f77afxY+cQDgG/h5AgAQDQCAaAAARAMAIBoAANEAAIgGAADRAACIBgBANAAAogEAEA0AgGgAAEQDAIBoAABEAwAgGgAA0QAAiAYAQDQAAKIBAEA0AACiAQAQDQCAaAAARAMAIBoAANEAACAaAADRAACIBgBANAAAogEAEA0AgGgAABANAIBoAABEAwAgGgAA0QAAiAYAQDQAAIgGAEA0AACiAQAQDQCAaAAARAMAIBoAAEQDACAaAADRAACIBgBANAAAogEAEA0AAKIBABANAIBoAABEAwAgGgAA0QAAiAYAANEAAIgGAEA0AACiAQAQDQCAaAAARAMAgGgAAEQDACAaAADRAACIBgBANAAAogEAQDQAAKIBABANAIBoAACeuf8+ybMe+2AB4MmNyj8gGt6YjgDwp/nPwmcAAHwD+zQAAKIBABANAIBoAABEAwAgGgAA0QAAIBoAANEAAIgGAEA0AACiAQAQDQCAaAAAEA0AgGgAAEQDACAaAADRAACIBgBANAAAiAYAQDQAAKIBABANAIBoAABEAwAgGgAARAMAIBoAANEAAIgGAEA0AACiAQAQDQAAogEAEA0AgGgAAEQDACAaAADRAACIBgAA0QAAiAYAQDQAAKIBABANAIBoAABEAwCAaAAARAMAIBoAANEAAIgGAEA0AACiAQBANAAAogEAEA0AgGgAAEQDACAaAADRAAAgGgAA0QAAiAYAQDQAAKIBABANAIBoAAAQDQCAaAAAnsL/AdWxyNAjkpmjAAAAAElFTkSuQmCC";
var fondoPasajeros =
  "data:image/png;base64,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AACiAQAQDQCAaAAARAMAIBoAANEAAIgGAADRAACIBgBANAAAogEAEA0AgGgAAEQDAIBoAABEAwAgGgAA0QAAiAYAQDQAAKIBAEA0AACiAQAQDQCAaAAARAMAIBoAANEAACAaAADRAACIBgBANAAAogEAEA0AgGgAABANAIBoAABEAwAgGgAA0QAAiAYAQDQAAIgGAEA0AACiAQAQDQCAaAAARAMAIBoAAEQDACAaAADRAACIBgBANAAAogEAEA0AAKIBABANAIBoAABEAwAgGgAA0QAAiAYAANEAAIgGAEA0AACiAQAQDQCAaAAARAMAgGgAAEQDACAaAADRAACIBgBANAAAogEAQDQAAKIBABANAIBoAABEAwAgGgAA0QAAIBoAANEAAIgGAEA0AACiAQAQDQCAaAAAEA0AgGgAAEQDACAaAADRAACIBgBANAAAiAYAQDQAAKIBABANAIBoAABEAwAgGgAARAMAIBoAANEAAIgGAEA0AACiAQAQDQAAogEAEA0AgGgAAEQDACAaAADRAACIBgAA0QAAiAYAQDQAAKIBABANAIBoAABEAwDANf8DY4Yv/bcoqPoAAAAASUVORK5CYII=";

function generarFichaPDF(Object, id) {
  // Obtén una referencia al elemento HTML donde se mostrará el código QR
  var qrDiv = document.getElementById("qrcode");

  // Define el texto o contenido para generar el código QR
  var qrText = id;

  // Crea una instancia del generador de código QR
  var qrcode = new QRCode(qrDiv, {
    text: qrText,
    width: 950,
    height: 2000,
  });

  // Convierte la imagen en formato PNG a formato JPG
  html2canvas(qrDiv).then(function (canvas) {
    qrDiv.style.display = "none";
    var imageData = canvas.toDataURL("image/jpeg");
    // Llama a la función crearPDF y pasa imageData como argumento
    crearPDF(fondoFicha, imageData, Object);
  });
}

function crearPDF(baseCertificado, firmaTutor, ObjectAll) {
  // Creacion del PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [2100, 2970],
  });
  // Agregando imagenes en base64
  doc.addImage(baseCertificado, 0, 0, 2100, 2970);
  doc.addImage(firmaTutor, 100, 415, 665, 665);

  /// PAGINA 1 DATOS
  const pag_fecha = ObjectAll.ini.fecha;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(pag_fecha, 430, 280);

  const pag_procedencia = ObjectAll.ini.procedencia;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(pag_procedencia, 430, 330);

  const pag_destino = ObjectAll.ini.destino;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(pag_destino, 1350, 280);

  const pag_poliza = ObjectAll.ini.poliza;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(pag_poliza, 1350, 330);
  console.log(ObjectAll.car.tipo);
  //VEHICULO VEHICULO VEHICULO
  //COLUMN1

  let veh_tipo = ObjectAll.car.tipo.toString();
  let vehiculoTipo;

  switch (veh_tipo) {
    case "1":
      vehiculoTipo = "Automóvil";
      break;
    case "2":
      vehiculoTipo = "Autobus";
      break;
    case "3":
      vehiculoTipo = "Moto";
      break;
    case "4":
      vehiculoTipo = "Camioneta";
      break;
    case "5":
      vehiculoTipo = "Camión";
      break;
    default:
      vehiculoTipo = "";
      break;
  }

  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(vehiculoTipo, 1120, 512);

  const veh_modelo = ObjectAll.car.modelo;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(veh_modelo, 1120, 562);

  const veh_motor = ObjectAll.car.motor;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(veh_motor, 1120, 610);

  const veh_placa = ObjectAll.car.placa;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(veh_placa, 1120, 655);

  //COLUMN2
  const veh_marca = ObjectAll.car.marca;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(veh_marca, 1710, 512);

  const veh_anio = ObjectAll.car.año;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(veh_anio, 1710, 562);

  const veh_chasis = ObjectAll.car.chasis;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(veh_chasis, 1710, 610);

  let veh_pais = ObjectAll.car.pais.toString();
  let vehiculoPais;
  switch (veh_pais) {
    case "1":
      vehiculoPais = "Perú";
      break;
    case "2":
      vehiculoPais = "Chile";
      break;
    case "3":
      vehiculoPais = "Venezuela";
      break;
    case "4":
      vehiculoPais = "Brasil";
      break;
    case "5":
      vehiculoPais = "Ecuador";
      break;
  }
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(vehiculoPais, 1710, 655);

  //CONDUCTOR CONDUCTOR CONDCUTOR

  const con_nombre = ObjectAll.driver.nombre;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(con_nombre, 1210, 840);

  const con_domicilio = ObjectAll.driver.domicilio;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(con_domicilio, 1210, 907);

  let con_profesion = ObjectAll.driver.profesion.toString();
  let conductorProfesion;
  switch (con_profesion) {
    case "1":
      conductorProfesion = "Actor/Actriz";
      break;
    case "2":
      conductorProfesion = "Administrador/a de empresas";
      break;
    case "3":
      conductorProfesion = "Agricultor/a";
      break;
    case "4":
      conductorProfesion = "Arquitecto/a";
      break;
  }
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(conductorProfesion, 1210, 970);

  let con_nacionalidad = ObjectAll.driver.nacionalidad.toString();
  let conductorNacionalidad;
  switch (con_nacionalidad) {
    case "1":
      conductorNacionalidad = "Perú";
      break;
    case "2":
      conductorNacionalidad = "Chile";
      break;
    case "3":
      conductorNacionalidad = "Venezuela";
      break;
    case "4":
      conductorNacionalidad = "Brasil";
      break;
    case "5":
      conductorNacionalidad = "Ecuador";
      break;
  }
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(conductorNacionalidad, 1210, 1040);
  //fila
  const con_brevete = ObjectAll.driver.brevete;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(con_brevete, 1040, 1105);

  const con_fecha = ObjectAll.driver.fecha_na;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(con_fecha, 1470, 1105);

  const con_scpp = ObjectAll.driver.scpp;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(con_scpp, 1790, 1105);

  const con_di = ObjectAll.driver.di;
  doc.setFontType("");
  doc.setFontSize(35);
  doc.text(con_di, 1210, 1160);

  // AGREGAR NUEVA PAGINA 2
  doc.addPage();
  doc.addImage(fondoPasajeros, 0, 0, 2100, 2970);
  // Página 2
  // Agrega contenido en la nueva página, como texto, imágenes, etc.
  // Agregando texto a la ficha del pdf
  doc.setFont("times new roman");
  //CALCULANDO SEPARACION VERTICAL DE LOS PASAJEROS EN EL PDF
  var espacioTotal = 2480; // Espacio total disponible para las secciones de datos
  var separacion = espacioTotal / 34; // Separación entre cada sección de datos
  var auxiliar = 0;

  // VARIABLES
  var cantidad = ObjectAll.pasajeros.length;
  console.log(cantidad);
  for (let i = 0; i < cantidad; i++) {
    // VARIABLES
    const pas_nombre = ObjectAll.pasajeros[i].nombre;
    const pas_nacionalidad = ObjectAll.pasajeros[i].nacionalidad;
    const pas_estCivil = ObjectAll.pasajeros[i].estado;
    const pas_profesion = ObjectAll.pasajeros[i].profesion;
    const pas_fechaNacimiento = ObjectAll.pasajeros[i].fecha;
    const pas_NumeroIdent = ObjectAll.pasajeros[i].di;
    doc.setFontType("");
    doc.setFontSize(35);
    doc.text(pas_nombre, 155, 335 + auxiliar);

    doc.setFontType("");
    doc.setFontSize(35);
    doc.text(pas_nacionalidad, 690, 335 + auxiliar);

    doc.setFontType("");
    doc.setFontSize(35);
    doc.text(pas_estCivil, 940, 335 + auxiliar);

    doc.setFontType("");
    doc.setFontSize(35);
    doc.text(pas_profesion, 1190, 335 + auxiliar);

    doc.setFontType("");
    doc.setFontSize(35);
    doc.text(pas_fechaNacimiento, 1600, 335 + auxiliar);

    doc.setFontType("");
    doc.setFontSize(35);
    doc.text(pas_NumeroIdent, 1840, 335 + auxiliar);
    auxiliar += separacion;
  }

  // Obtener el contenido del PDF como un objeto Blob
  const pdfBlob = doc.output("blob");
  const pdfURL = URL.createObjectURL(pdfBlob);
  window.open(pdfURL);
  doc.save("registroRelacion" + ".pdf");
}
