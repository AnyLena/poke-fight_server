import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { required: true, type: String },
  password: { required: true, type: String },
  pokemons: { required: true, type: Array },
  team: { required: false, type: Array, default: [] },
  seen: { required: false, type: Array, default: [1,4,7] },
  battles: { required: false, type: Array, default: []},
});

const User = mongoose.model("User", UserSchema);

export default User;
