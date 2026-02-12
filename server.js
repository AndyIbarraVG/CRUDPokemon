const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const pokemonRoutes = require("./routes/pokemonRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/pokemon", pokemonRoutes);

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/pokemonSR")
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(3000, () => {
      console.log("Servidor corriendo en puerto 3000");
    });
    app.use(express.static("public"));
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });
