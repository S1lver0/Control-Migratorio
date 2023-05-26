// Fecha minima sea hoy
const fechaActual = new Date().toISOString().substr(0, 10);
document.getElementById("fechaActual").value = fechaActual;

//creando variables que representan algunos elementos HTML
const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");

//countries es una matriz que contiene una lista de países que se utilizará para construir el menú desplegable.
let countries = ["Perú","Chile","Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina",
"Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia",
"Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar",
"Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia",
"Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos",
"Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea",
"Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón",
"Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia",
"Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México",
"Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda",
"Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido",
"República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana",
"República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía",
"Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur",
"Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía",
"Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];

//addCountry es una función que se utiliza para agregar los elementos de la lista de países al menú desplegable
function addCountry(selectedCountry) {
    options.innerHTML = "";
    countries.forEach(country => {
        let isSelected = country == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addCountry();


//updateName es una función que se llama cada vez que se selecciona un elemento en el menú desplegable.
function updateName(selectedLi) {
    searchInp.value = "";
    addCountry(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

//Este evento se activa cada vez que se suelta una tecla en el teclado mientras el cursor está en el input.
searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = countries.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));


// PARA LA NACIONALIDAD DEL CONDUCTOR
const wrapper2 = document.querySelector(".wrapper2"),
selectBtn2 = wrapper2.querySelector(".select-btn2"),
searchInp2 = wrapper2.querySelector("input"),
options2 = wrapper2.querySelector(".options2");

let countries2 = ["Perú","Chile","Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina",
"Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia",
"Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar",
"Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia",
"Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos",
"Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea",
"Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón",
"Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia",
"Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México",
"Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda",
"Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido",
"República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana",
"República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía",
"Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur",
"Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía",
"Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];

function addCountry2(selectedCountry) {
    options2.innerHTML = "";
    countries2.forEach(country => {
        let isSelected = country == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName2(this)" class="${isSelected}">${country}</li>`;
        options2.insertAdjacentHTML("beforeend", li);
    });
}
addCountry2();

function updateName2(selectedLi) {
    searchInp2.value = "";
    addCountry2(selectedLi.innerText);
    wrapper2.classList.remove("active");
    selectBtn2.firstElementChild.innerText = selectedLi.innerText;
}

searchInp2.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp2.value.toLowerCase();
    arr = countries2.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn2.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName2(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options2.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! País no encontrado</p>`;
});

selectBtn2.addEventListener("click", () => wrapper2.classList.toggle("active"));



// PARA EL PAIS DEL VEHICULO

const wrapper3 = document.querySelector(".wrapper3"),
selectBtn3 = wrapper3.querySelector(".select-btn3"),
searchInp3 = wrapper3.querySelector("input"),
options3 = wrapper3.querySelector(".options3");

let countries3 = ["Perú","Chile","Argentina","Ecuador","Venezuela","Bolivia","Brasil","Colombia","Paraguay","Uruguay","México","Trinidad y Tobago","Estados Unidos","Canadá","Costa Rica","Islas Caimán"];

function addCountry3(selectedCountry) {
    options3.innerHTML = "";
    countries3.forEach(country => {
        let isSelected = country == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName3(this)" class="${isSelected}">${country}</li>`;
        options3.insertAdjacentHTML("beforeend", li);
    });
}
addCountry3();

function updateName3(selectedLi) {
    searchInp3.value = "";
    addCountry3(selectedLi.innerText);
    wrapper3.classList.remove("active");
    selectBtn3.firstElementChild.innerText = selectedLi.innerText;
}

searchInp3.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp3.value.toLowerCase();
    arr = countries3.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn3.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName3(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options3.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! País no encontrado</p>`;
});

selectBtn3.addEventListener("click", () => wrapper3.classList.toggle("active"));