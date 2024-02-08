import User from "../models/User.js";

export const getUser = async (req, res) => {
  const { name, password } = req.query;
  console.log(name, password)
  try {
    const data = await User.findOne({name:name, password:password})
    if (!data) {
      res.sendStatus(404);
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postUser = async (req, res) => {
  const { name, password, pokemonId } = req.body;
  const user = await User.findOne({ name });
  if (user)
    return res.status(400).json({ message: "User name already taken." });
  const newUser = {};
  if (name) newUser.name = name;
  if (password) newUser.password = password;
  if (pokemonId) newUser.pokemons = [pokemonId];
  try {
    const data = await User.create(newUser);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const putUser = async (req, res) => {
  const { id } = req.params;
  const { newPokemonId } = req.body;
  try {
    const data = await User.findByIdAndUpdate(id, {
      $push: { pokemons: newPokemonId },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
