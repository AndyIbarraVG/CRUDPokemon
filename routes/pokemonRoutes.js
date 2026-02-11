const express = require("express");
const router = express.Router();
const controller = require("../controllers/pokemonController");

router.post("/", controller.createPokemon);
router.get("/", controller.getPokemons);

module.exports = router;
