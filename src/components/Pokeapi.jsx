import './Pokeapi.css'
import { useState, useEffect } from "react"

const Pokeapi = () => {
  const [pokemonList, setPokemonList] = useState([])

  async function searchPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    const pokemons = await response.json()

    const pokemonUrls = pokemons.results.map(pokemon => pokemon.url)
    const promises = pokemonUrls.map(url => fetch(url))

    const pokemonResponses = await Promise.all(promises)
    const pokemonData = await Promise.all(
      pokemonResponses.map(async (pokemonResponse) => {
        const pokemon = await pokemonResponse.json()

        const typeUrls = pokemon.types.map(type => type.type.url)
        const typePromises = typeUrls.map(typeUrl => fetch(typeUrl))
        const typeResponses = await Promise.all(typePromises)

        const typeData = await Promise.all(
          typeResponses.map(typeResponse => typeResponse.json())
        )

        pokemon.typesData = typeData
        return pokemon
      })
    )
    setPokemonList(pokemonData)

  }

  useEffect(() => {
    searchPokemon()
  }, [])

  return (
    <div className="pokegrid">
      {pokemonList.map((pokemon) => (
        <div key={pokemon.name}>
          <img src={pokemon.sprites.front_default}></img>
          <p className='pokecard'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>

          {pokemon.typesData?.map((typeData) => (
            <span key={typeData.name}>{typeData.name}</span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Pokeapi