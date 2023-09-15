const URL = new URLSearchParams(window.location.search);

fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("name")}`)
  .then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      document.body.innerText += "Ups, noget gik galt. Prøv igen senere.";
    }
  })
  .then(function (data) {
    console.log(data);
    const DIV = document.querySelector(".pokedex__pokemonName");
    DIV.innerHTML = `
     
    <div class="pokedex">
    <div class="pokedex__imgcontainer">
    <img class="pokedex__img" src="${
      data.sprites.other["official-artwork"].front_default
    }">
    </div>
    <h1>${data.name}</h1>
    <div class="pokedex__info">
    <ul class="pokedex__infotext">
  ${data.types
    .map(
      (element) =>
        `<li class="pokedex__infotext type-${element.type.name}">Type: ${element.type.name}</li>`
    )
    .join("")}
</ul>
    <p class="pokedex__infotext">Height: ${data.height}</p> 
    <p class="pokedex__infotext">Abilities:</p>
    <ul class="pokedex__infotext">${data.abilities
      .map(
        (element) =>
          `<li class="pokedex__infotext">- ${element.ability.name}</li>`
      )
      .join("")}</ul>
    </div>
    </div>`;
  });
