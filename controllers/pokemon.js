import { pokemon } from '../data/data.js';

export const getPokemons = (req, res) => {
    res.json(pokemon);
}

export const getPokemon = (req, res) => {
    const { id } = req.params
    const individualPokemon = pokemon.find((poke) => poke.id === Number(id))
    res.json(individualPokemon);
}

export const getPokemonInfo = (req, res) => {
    const { id, info } = req.params
    if (!info) return res.sendStatus(404);
    if (info !== "name" || info !== "type" || info !== "base") return sendStatus(404);
    const pokemonInfo = pokemon.find((poke) => poke.id === Number(id))
    res.json(pokemonInfo[info])
}

// please init in the week10 folder :)