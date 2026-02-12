const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  hp: { type: Number, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  speed: { type: Number, required: true }
}, { _id: false });

const PokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },

  type: {
    type: [String],
    required: true
  },

  role: {
    type: String,
    enum: ["player", "enemy"],
    required: true
  },

  biome: {
    type: String,
    enum: ["fire", "forest", "ice", "water"],
    required: function () {
      return this.role === "enemy";
    }
  },

  stats: {
    type: StatsSchema,
    required: true
  }

}, {
  versionKey: false
});

module.exports = mongoose.model("Pokemon", PokemonSchema);
