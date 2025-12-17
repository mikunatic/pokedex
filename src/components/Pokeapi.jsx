import './Pokeapi.css'
import { useState, useEffect } from "react"

const Pokeapi = () => {
  const [pokemonList, setPokemonList] = useState([])

  async function searchPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    const pokemons = await response.json()

    const urls = pokemons.results.map(pokemon => pokemon.url)

    const promises = urls.map(url => fetch(url))

    const responses = await Promise.all(promises)

    const pokemonData = await Promise.all(responses.map(r => r.json()))

    setPokemonList(pokemonData)
  }

  useEffect(() => {
    searchPokemon()
  }, [])

  return (
    <div className="pokecard">
      {pokemonList.map((pokemon) => (
        <div key={pokemon.name}>
          <img src={pokemon.sprites.front_default}></img>
          <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
        </div>
      ))}
    </div>
  )
}

export default Pokeapi