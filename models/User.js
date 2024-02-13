import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { required: true, type: String },
  password: { required: true, type: String },
  pokemons: { required: true, type: Array },
  team: { required: false, type: Array },
  seen: { required: false, type: Array, default: [1, 4, 7] },
  battles: { required: false, type: Array, default: [] },
  // initialPokemon: { required: true, type: Number },
});

const User = mongoose.model("User", UserSchema);

export default User;
