const Pokemon = require("../models/Pokemon");

exports.createPokemon = async (req, res) => {
  const pokemon = await Pokemon.create(req.body);
  res.json(pokemon);
};

exports.getPokemons = async (req, res) => {
  const pokemons = await Pokemon.find();
  res.json(pokemons);
};
