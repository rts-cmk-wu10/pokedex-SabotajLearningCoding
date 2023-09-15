const URL = new URLSearchParams(window.location.search);
const OFFSET = parseInt(URL.get("offset") || 0);

const NEXT_PAGE = document.querySelector(".pokedex__nextPage");
const PREV_PAGE = document.querySelector(".pokedex__prevPage");

fetch(`https://pokeapi.co/api/v2/pokemon?offset=${OFFSET}`)
  .then(function (response) {
    if (response.status !== 200) {
      throw new Error("fejlbesked");
    }
    return response.json();
  })

  .then(function (data) {
    const LAST_OFFSET = data.count - (data.count % 20);
    NEXT_PAGE.href = `/?offset=${
      OFFSET >= LAST_OFFSET ? LAST_OFFSET : OFFSET + 20
    }`;

    PREV_PAGE.href = `/?offset=${OFFSET <= 0 ? 0 : OFFSET - 20}`;

    const UL = document.querySelector(".pokeList");
    data.results.forEach(function (result) {
      const LI = document.createElement("li");
      LI.innerHTML = `
      <a href="pokemon.html?name=${result.name}">${result.name}</a>
      `;
      UL.append(LI);
    });
  });
