function getPass() {
    var passForm = document.getElementById('passForm');
    console.log(passForm);
}

function agregarPasajero() {
    var nombre_apellidos = document.getElementById('id_Nombre_P').value;
    var nacionalidad = document.getElementById('id_Nacionalidad_P').textContent;
    var estadoCivil = document.getElementById('id_EstadoCivil_P').value;
    var profesion = document.getElementById('id_Profesion_P').value;
    var DNI = document.getElementById('id_DNI_P').value;
    var Numero_DNI = document.getElementById('id_NumeroDNI_P').value;
    var nacimiento = document.getElementById('id_Nacimiento_P').value;
    var campos = [nombre_apellidos, nacionalidad, estadoCivil, profesion, DNI, Numero_DNI, nacimiento];
    // Expresión regular para permitir ciertos caracteres
    var nombreRegex = /^[a-zA-Z\s]*$/;
    var numeroDNIRegex = /^[0-9]+$/;
    var numeroPasExRegex = /^[a-zA-Z0-9]+$/;
    //alert(DNI);
    //alert(nacimiento);
    if (!nombreRegex.test(nombre_apellidos)) {
        alert('El campo Nombre y Apellidos solo debe contener letras y espacios.');
        return;
    }
    if (DNI === 'dni' && (!numeroDNIRegex.test(Numero_DNI) || Numero_DNI.length !== 8)) {
        if(Numero_DNI.length !== 8){
            //alert('El campo Número DNI solo debe contener números.');
            alert('El campo Número DNI debe contener exactamente 8 dígitos numéricos.');
        }else{
            alert('El campo Número DNI solo debe contener números.');
            //alert('El campo Número DNI debe contener exactamente 8 dígitos numéricos.');
        }
        return;
    }
    if (DNI === 'carnet-extranjeria' && (!numeroPasExRegex.test(Numero_DNI) || Numero_DNI.length !== 12)) {
        if(Numero_DNI.length !== 12){
            alert('El campo Número Carnet de extranjeria debe contener exactamente 12 caracteres.');
            //alert('El campo Número Carnet de extranjeria solo debe contener números y letras.');
        }else{
            //alert('El campo Número Carnet de extranjeria debe contener exactamente 12 dígitos.');
            alert('El campo Número Carnet de extranjeria solo debe contener números y letras.');
        }
        return;
    }
    if (DNI === 'pasaporte' && (!numeroPasExRegex.test(Numero_DNI) || Numero_DNI.length !== 12)) {
        if(!numeroDNIRegex.test(Numero_DNI)){
            alert('El campo Número Pasarpote debe contener exactamente 8 dígitos numéricos.');
            //alert('El campo Número Pasarpote solo debe contener números y letras.');
        }else{
            alert('El campo Número Pasarpote solo debe contener números y letras.');
            //alert('El campo Número Pasarpote debe contener exactamente 8 dígitos numéricos.');
        }
        return;
    }
    for (var i = 0; i < campos.length; i++) {
        if (campos[i] === '' || campos[i] === 'Seleccione un pais') {
            alert('Por favor, complete todos los campos antes de agregar el pasajero.');
            return;
        }
    }
    // Aquí puedes realizar las acciones

    alert('Se agregó el pasajero exitosamente.');
}



