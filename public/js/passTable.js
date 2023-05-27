//objetos
var pasajeros = [];
var car;
var ini;
var driver;
////
var conteo=0;

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
    select_profesion:select_profesion
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
}

function deleteAllTable() {
  var tbody = document.getElementById("addTable");
  tbody.innerHTML = "";
  pasajeros = [];
  console.log(pasajeros);
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
    Conductor.querySelector("#sc_pp").value == ""
  ) {
    mensaje_Adv(
      "Por favor, complete todos los campos requeridos antes de generar ficha"
    );
    return;
  }
  if(conteo==0){
    mensaje_Adv(
      "Tiene que ingresar al menos un pasajero"
    );
  }else{
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
  };

  console.log(ini);
  console.log(car);
  console.log(driver);
  GenerarJson();
}

function GenerarJson(){
  var ObjAll = {
    pasajeros:pasajeros,
    car:car,
    driver:driver,
    ini:ini
  }
  console.log(ObjAll);
}



