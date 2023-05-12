const getTypeColor = (type) => {
    const normal = "#F5F5F5";
    return (
        {
            normal,
            fire: "#FDDFDF",
            grass: "#DEFDE0",
            electric: "#FCF7DE",
            ice: "#DEF3FD",
            water: "#DEF3FD",
            ground: "#F4E7DA",
            rock: "#D5D5D4",
            fairy: "#FCEAFF",
            poison: "#98D7A5",
            bug: "#F8D5A3",
            ghost: "#CAC0F7",
            dragon: "#97B3E6",
            psychic: "#EAEDA1",
            fighting: "#E6E0D4",
        }[type] || normal
    );
};


const loadPokemons = async () => {
    const dataPokemons = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=15&offset=0"
    );
    const { results: pokemons } = await dataPokemons.json();
    createPokemon(pokemons)

};

const createPokemon = (pokemonlist) => {
    const lista = document.querySelector('[data-js="lista-card"]');

    pokemonlist.forEach(async (pokemon, id) => {
        const { name, url } = pokemon;
        getType = await fetch(url);
        getType = await getType.json();
        const { name: typeName } = getType.types[0].type;
        pokemon = {
            name,
            type: typeName,
            color: getTypeColor(typeName),
            id,
        }; 
    });
    console.log(lista);
    loadNextPokemons() 
};

const createLi = (nome, type, color, id) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    li.setAttribute("class", "card");
    li.style.setProperty("--type-color", color);
    img.setAttribute("class", "card-image");
    img.setAttribute("src", `assets/img/(${id}).png`);
    img.setAttribute("alt", nome);
    h2.setAttribute("class", "card-title");
    h2.textContent = nome;
    p.setAttribute("class", "card-subtitle");
    p.textContent = type;
    li.append(img, p, h2);
    return li;
};

const loadNextPokemons = () => {
    const lista = document.querySelector('[data-js="lista-card"]').lastElementChild 
    console.log(lista); 
    /*
    const observer = new IntersectionObserver(element => {
        if (!element.isIntersecting) {
            console.log("feito")
        } 
        arr[arr. length - 1]
    })
    */
};   


loadPokemons();

