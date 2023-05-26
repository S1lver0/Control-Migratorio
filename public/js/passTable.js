var pasajeros = [];

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

  //--
  pass = {
    nombre: campos[0],
    nacionalidad: campos[1],
    estado: campos[2],
    profesion: campos[3],
    di: campos[5],
    fecha: campos[6],
  };
  pasajeros.push(pass);
  addTable();
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
