import axios from "axios";
import { pokemon } from "../data/data.js";

export const getPokemons = async (req, res) => {
  const { offset, limit } = req.query;
  // const offset = 0;
  // const limit= 10;
  // console.log("Fetching pokemons", offset, limit)
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const { results } = response.data;
    const arrayOfPromises = results.map((poke) => {
      return axios.get(poke.url);
    });

    const getAllPokeNames = async (url) => {
      const response = await axios.get(url);
      return response.data.names;
    };

    const arrayOfPokemon = await Promise.all(arrayOfPromises);
    const pokemons = await Promise.all(
      arrayOfPokemon.map(async (poke) => {
        const allNames = await getAllPokeNames(poke.data.species.url);

        return {
          id: poke.data.id,
          name: {
            en: poke.data.name,
            other: allNames,
          },
          type: poke.data.types.map((type) => type.type.name),
          base: {
            hp: poke.data.stats[0].base_stat,
            attack: poke.data.stats[1].base_stat,
            defense: poke.data.stats[2].base_stat,
            special_attack: poke.data.stats[3].base_stat,
            special_defense: poke.data.stats[4].base_stat,
            speed: poke.data.stats[5].base_stat,
          },
          sprites: poke.data.sprites,
        };
      })
    );
    res.json(pokemons);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getPokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getPokemonInfo = (req, res) => {
  const { id, info } = req.params;
  if (!info) return res.sendStatus(404);
  if (info !== "name" || info !== "type" || info !== "base")
    return sendStatus(404);
  const pokemonInfo = pokemon.find((poke) => poke.id === Number(id));
  res.json(pokemonInfo[info]);
};
