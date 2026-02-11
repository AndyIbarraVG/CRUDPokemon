const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  hp: Number,
  attack: Number,
  defense: Number,
  speed: Number
}, { _id: false });

const PokemonSchema = new mongoose.Schema({
  name: String,
  type: [String],
  stats: StatsSchema
},{ 
  versionKey: false
});

module.exports = mongoose.model("Pokemon", PokemonSchema);
