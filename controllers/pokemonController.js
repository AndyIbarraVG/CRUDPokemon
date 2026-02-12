const Pokemon = require("../models/Pokemon");

// Crear Pokemon
const createPokemon = async (req, res) => {
  try {
    const { name, type, role, biome, stats } = req.body;

    // Validaciones básicas
    if (!name || !type || !role || !stats) {
      return res.status(400).json({
        message: "Nombre, tipo, rol y estadísticas son obligatorios"
      });
    }

    // Validar rol permitido
    if (!["player", "enemy"].includes(role)) {
      return res.status(400).json({
        message: "El rol debe ser 'player' o 'enemy'"
      });
    }

    // Si es enemigo, biome es obligatorio
    if (role === "enemy" && !biome) {
      return res.status(400).json({
        message: "El bioma es obligatorio para Pokémon enemigos"
      });
    }

    // Si es player, eliminamos biome por seguridad
    if (role === "player") {
      req.body.biome = undefined;
    }

    const pokemon = await Pokemon.create(req.body);

    res.status(201).json(pokemon);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
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

// Actualizar Pokemon
const updatePokemon = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Pokemon.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );


    if (!updated) {
      return res.status(404).json({ message: "Pokemon no encontrado" });
    }

    res.json(updated);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar Pokemon
const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Pokemon.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Pokemon no encontrado" });
    }

    res.json({ message: "Pokemon eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Exportar correctamente
module.exports = {
  createPokemon,
  getPokemons,
  updatePokemon,
  deletePokemon
};
