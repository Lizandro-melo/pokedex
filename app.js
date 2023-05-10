

// async, await and fetch
// "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"



const app = async () => {

  const lista = document.querySelector("#lista");
  const pokemonApi = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=15&offset=0"
  );

  const { results: pokemonNameUrl } = await pokemonApi.json();
  let index = 1
  let i = 0
  while (i < pokemonNameUrl.length) {
    pokemonNameUrl[i].id = index;
    i++;
    index++;
  }

  pokemonNameUrl.forEach(async (pokemon) => {
    const pokemonResponse = await fetch(pokemon.url);
    const responseJSON = await pokemonResponse.json();
    const pokemonObj = {
      nome: pokemon.name,
      type: responseJSON.types[0].type.name,
      id: pokemon.id,
    }
    lista.append(criarLista(pokemonObj.nome, pokemonObj.type, pokemonObj.id));
  });


};

const criarLista = (nome, type, id) => {
  const li = document.createElement("li");
  const img = document.createElement("img");
  const title = document.createElement("h2");
  const subTitle = document.createElement("p");
  img.setAttribute("class", "card-image");
  title.setAttribute("class", "card-title");
  subTitle.setAttribute("class", "card-subtitle");
  img.setAttribute("src", `assets/img/${id}.png`);
  img.setAttribute("alt", nome);
  title.textContent = nome;
  subTitle.textContent = type;
  li.append(img, title, subTitle);
  li.setAttribute("class", "card");
  li.style.setProperty("--type-color", getTypeColor(type))
  return li;
};


app();

