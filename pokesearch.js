const searchBar = document.querySelector(".pokedex__form__search-bar");
const searchBtn = document.querySelector(".pokedex__form__search-btn");
const pokemonResultDiv = document.querySelector(".pokemon-result");

const DATALIST = document.querySelector("#pokemons");

searchBar.addEventListener("focus", getDatalist);

searchBar.addEventListener("focusout", function (event) {
  searchBar.removeEventListener("focus", getDatalist);
});

function getDatalist(event) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
    .then(function (response) {
      // fejl tjek, (status kode 200 eller noget andet?)
      return response.json();
    })
    .then(function (data) {
      DATALIST.innerHTML = "";
      data.results.forEach(function (pokemon) {
        DATALIST.innerHTML += `<option>${pokemon.name}</option>`;
      });
    });
}

searchBtn.addEventListener("click", submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const keyword = searchBar.value.toLowerCase();

  if (!keyword.trim()) {
    alert("Søgefeltet er tomt!");
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${keyword}`)
    .then((response) => {
      if (!response.ok) {
        alert("Pokémon blev ikke fundet!");
      }
      return response.json();
    })
    .then((data) => {
      window.location.href = `pokemon.html?name=${data.name}`;
    })
    .catch((error) => {
      console.error(error.message);
    });
}
