import "dotenv/config";
import express from "express";
import cors from "cors";
import pokemonRouter from "./routes/pokemon.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use("/pokemon", pokemonRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
