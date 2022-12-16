const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

const convertPokemonToLi = pokemon => {
  const { type, number, name, types, photo } = pokemon
  return `
      <li class="pokemon ${type}">
          <span class="number">#${number}</span>
          <span class="name">${name}</span>

          <div class="detail">
              <ol class="types">
                ${types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>

            <img src="${photo}"
                alt="${name}">
            </div>
        </li>
    `
}

const loadPokemonItens = (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

const leadMorePokemons = () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }

    loadPokemonItens(offset, limit)
}

loadMoreButton.addEventListener('click', leadMorePokemons)