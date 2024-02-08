import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { required: true, type: String },
  password: { required: true, type: String },
  pokemons: { required: false, type: Array },
});

const User = mongoose.model("User", UserSchema);

export default User;
