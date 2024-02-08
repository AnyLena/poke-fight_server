import express from 'express';
import { getPokemons, getPokemon, getPokemonInfo } from '../controllers/pokemon.js';
import { checkPokemon } from '../middlewares/pokemon.js';

const pokemonRouter = express.Router()

pokemonRouter.get("/:id/:info", checkPokemon, getPokemonInfo);
pokemonRouter.get("/:id", checkPokemon, getPokemon);
pokemonRouter.get("/", getPokemons);

export default pokemonRouter