//Endpoints
const name = "https://pokeapi.co/api/v2/pokemon/";

//Elementos del DOM
let buttonSearch = document.querySelector(".buttonSearch");
buttonEvolution = document.querySelector(".buttonEvolution");
let in1 = document.getElementById("in1");
let containerError = document.querySelector(".containerError");
let containerInfo = document.querySelector(".containerInfo");
let containerEvolution = document.querySelector(".containerEvolution");

let pokemonName = document.querySelector(".pokemonName");
let pokemonImg = document.querySelector(".pokemonImg");
let pokemonType = document.querySelector(".pokemonType");
let pokemonDescrition = document.querySelector(".pokemonDescrition");
let pokemonAbilities = document.querySelector(".pokemonAbilities");

//Variables auxiliares
let Pokeevo1 = "";

//Click en buscar
buttonSearch.addEventListener("click", async function () {
  let textbox = in1.value.toLowerCase();
  

  if (textbox == "") {
    containerError.setAttribute("style", "display:block");
    return;
  }
  else {
    containerError.setAttribute("style", "display:none");
  }

  url = name + textbox;
  data = await consulta(url);

  card(data);
  evolve(url, Pokeevo1);
});

//Click en evolución
buttonEvolution.addEventListener("click", async function () {
    url = name + Pokeevo1;
    data = await consulta(url);
  
    card(data);
    evolve(url, Pokeevo1);
});

//Creación de tarjeta
async function card(data) {
    Name = data.name.toUpperCase();
    Img = data.sprites.other["official-artwork"].front_default;
    Type = data.types[0].type.name;
    descrition = data.species.url;
    description = await consulta(descrition);
    description = description.flavor_text_entries;
    for (i=0; i < description.length; i++) {
        if (description[i].language.name == "es") {
            descrition = description[i].flavor_text;
            break;
        }
    }
    let Abilities = "";
    for (i = 0; i < data.abilities.length; i++) {
        Abilities += data.abilities[i].ability.name + " ";
    }
    pokemonName.innerHTML = Name;
    pokemonImg.src = Img;
    pokemonType.innerHTML = Type;
    pokemonDescrition.innerHTML = descrition;
    pokemonAbilities.innerHTML = Abilities;
    containerInfo.setAttribute("style", "display:block");  
}

//Evolución
async function evolve(url, evol) {
    data = await consulta(url);
    Name = data.name;
    data = data.species.url;
    data = await consulta(data);
    data = data.evolution_chain.url;
    data = await consulta(data);


    if (data.chain.evolves_to[0].evolves_to[0].species.name == Name) {
        containerEvolution.setAttribute("style", "display:none");
        evol = "";
        return evol;
    }
    else{
        containerEvolution.setAttribute("style", "display:block");
        return evol;
    }
}


//Consulta a la API
async function consulta(url) {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
        if (error = "Error: Request failed with status code 404") {
            console.log(error);
            containerError.setAttribute("style", "display:block");
            return;
        }
      console.error(`Falló esta vuelta: ${error}`);
      alert("API query failed");
    }
}