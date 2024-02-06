import express from 'express';
import { getPokemons, getPokemon, getPokemonInfo } from '../controllers/pokemon.js';
import { checkPokemon } from '../middlewares/pokemon.js';

const pokemonRouter = express.Router()

pokemonRouter.use("/:id/:info", checkPokemon, getPokemonInfo);
pokemonRouter.use("/:id", checkPokemon, getPokemon);
pokemonRouter.use("/", getPokemons);

export default pokemonRouter