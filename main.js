const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
let capturados = [];

function pokedex(){

limpiar("login")

let hNombre = document.createElement("H2");
hNombre.innerHTML ="Pokedex";

const login = document.getElementById('login');
login.appendChild(hNombre);

let limit = 8;
let offset = 1;

let previousButton = document.createElement("button"); 
previousButton.setAttribute("class", "botones");
previousButton.innerHTML = "Anterior";

previousButton.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
});

let nextButton = document.createElement("button"); 
nextButton.setAttribute("class", "botones");
nextButton.innerHTML = "Siguiente";

nextButton.addEventListener("click", () => {
  offset += 9;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

let cerrarButton = document.createElement("button"); 
cerrarButton.setAttribute("class", "botones");
cerrarButton.innerHTML = "Cerrar sesion";

cerrarButton.addEventListener("click", () => {
  limpiar("pokedex");
  limpiar("navB");
  limpiar("login");
  inicioSesion();
});

let capturadosButton = document.createElement("button");
capturadosButton.setAttribute("class","botones");
capturadosButton.innerHTML = "Capturados";
capturadosButton.onclick = function(){limpiar("pokedex"); limpiar("navB"); limpiar("login"); mostrarCapturados();}


const nextLi = document.getElementById('navB');
nextLi.appendChild(previousButton);
nextLi.appendChild(nextButton);
nextLi.appendChild(cerrarButton);
nextLi.appendChild(capturadosButton);


function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
      spinner.style.display = "none";
    });
}

function fetchPokemons(offset, limit) {
  spinner.style.display = "block";
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

function createPokemon(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);
  card.onclick = function(){alert(name.textContent + " capturado"); capturados.push(pokemon.id)}

  cardContainer.appendChild(card);
  pokemonContainer.appendChild(flipCard);
}



function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons(offset, limit);

}

function limpiar(pagina){
  let docu = document.getElementById(pagina)
  while(docu.firstChild){
    docu.removeChild(docu.firstChild)
  }
}

function inicioSesion(){
  limpiar("login");
  let imgPokeball = document.createElement("img"); 
  imgPokeball.setAttribute("src", "/pokeball.png");
  imgPokeball.setAttribute("id", "pokeball");

  let hNombre = document.createElement("H2");
  hNombre.innerHTML ="Email";

  let inputN = document.createElement("input");
  inputN.setAttribute("type", "email");
  inputN.setAttribute("id", "nombre");

  let hContra = document.createElement("H2");
  hContra.innerHTML ="Contraseña";

  let inputC = document.createElement("input");
  inputC.setAttribute("type", "password");
  inputC.setAttribute("id", "contra");

  let buttonIniciar = document.createElement("button");
  buttonIniciar.setAttribute("onclick", "pokedex()");
  buttonIniciar.setAttribute("class", "botones");
  buttonIniciar.innerHTML = "Iniciar sesion"

  let buttonRegistar = document.createElement("button");
  buttonRegistar.setAttribute("onclick", "pokedex()");
  buttonRegistar.setAttribute("class", "botones");
  buttonRegistar.innerHTML = "Registrase"
  
  let br = document.createElement("br")

  const login = document.getElementById('login');
  login.appendChild(imgPokeball);
  login.appendChild(hNombre);
  login.appendChild(inputN);
  login.appendChild(hContra);
  login.appendChild(inputC);
  login.appendChild(br)
  login.appendChild(buttonIniciar);
  login.appendChild(buttonRegistar);
}

function mostrarCapturados(){

  let hNombre = document.createElement("H2");
  hNombre.innerHTML ="Capturados";

  const login = document.getElementById('login');
  login.appendChild(hNombre);

  let cerrarButton = document.createElement("button"); 
  cerrarButton.setAttribute("class", "botones");
  cerrarButton.innerHTML = "Cerrar sesion";

  cerrarButton.addEventListener("click", () => {
    limpiar("pokedex");
    limpiar("navB");
    inicioSesion();
  });

  let pokedexButton = document.createElement("button");
  pokedexButton.setAttribute("class","botones");
  pokedexButton.innerHTML = "Pokedex";
  pokedexButton.onclick = function(){limpiar("pokedex"); limpiar("navB"); pokedex();}


  const nextLi = document.getElementById('navB');
  nextLi.appendChild(cerrarButton);
  nextLi.appendChild(pokedexButton);


  function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        createPokemon(data);
        spinner.style.display = "none";
      });
  }

  function fetchPokemons() {
    spinner.style.display = "block";
    for (const poke of capturados) {
      fetchPokemon(poke);
    }
  }

  function createPokemon(pokemon) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.onclick = function(){alert(name.textContent + " liberado");for( var i = 0; i < capturados.length; i++){ if(capturados[i]==pokemon.id){capturados.splice(i,1);} }; limpiar("pokedex");limpiar("login");limpiar("navB");mostrarCapturados();  }

    cardContainer.appendChild(card);
    pokemonContainer.appendChild(flipCard);
  }



  function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  fetchPokemons();

}

function postEntrenador(email, contra){
  email = document.getElementById("nombre").value;
  contra = document.getElementById("contra").value;

  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if(xmlHttp.readyState === 4 && xmlHttp.status === 201) {
    }
  };
  xmlHttp.open("POST", "http://localhost:3000");
  xmlHttp.send();
}

function getEntrenador(email, contra){
  email = document.getElementById("nombre").value;
  contra = document.getElementById("contra").value;

  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if(xmlHttp.readyState === 4 && xmlHttp.status === 201) {
    }
  };
  xmlHttp.open("GET", "http://localhost:3000");
  xmlHttp.send();
}

function putEntrenadol(email, capturadosP){
  email = document.getElementById("nombre").value;
  capturadosP = capturados  

  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if(xmlHttp.readyState === 4 && xmlHttp.status === 201) {
    }
  };
  xmlHttp.open("PUT", "http://localhost:3000");
  xmlHttp.send();
}