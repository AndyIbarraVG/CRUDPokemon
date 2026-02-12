const Pokemon = require("../models/Pokemon");

// Crear Pokemon
const createPokemon = async (req, res) => {
  try {
    const { name, type, role, stats } = req.body;

    if (!name || !type || !role || !stats) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const pokemon = await Pokemon.create(req.body);
    res.status(201).json(pokemon);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los Pokemon
const getPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exportar correctamente
module.exports = {
  createPokemon,
  getPokemons
};
