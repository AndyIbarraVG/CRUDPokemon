const express = require("express");
const router = express.Router();
const controller = require("../controllers/pokemonController");

router.post("/", controller.createPokemon);
router.get("/", controller.getPokemons);
router.put("/:id", controller.updatePokemon);
router.delete("/:id", controller.deletePokemon);


module.exports = router;
