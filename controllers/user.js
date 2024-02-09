import User from "../models/User.js";

export const getUser = async (req, res) => {
  const { username, password } = req.query;
  console.log(username, password);
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).json({ message: "User not found." });
    } else {
      user.password !== password
        ? res.status(401).json({ message: "Wrong password." })
        : res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postUser = async (req, res) => {
  console.log("postUser");
  const { username, password, pokemonId } = req.body;
  const user = await User.findOne({ username: username });
  if (user)
    return res.status(400).json({ message: "User name already taken." });
  const newUser = {};
  if (username) newUser.username = username;
  if (password) newUser.password = password;
  if (pokemonId) newUser.pokemons = [pokemonId];
  try {
    const data = await User.create(newUser);
    res.status(201).json({data, message: "User created. You can log in now."});
    console.log("User created");
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
