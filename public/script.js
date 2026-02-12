const form = document.getElementById("pokemonForm");
const list = document.getElementById("pokemonList");

// Inputs
const nameInput = document.getElementById("name");
const typeInput = document.getElementById("type");
const roleInput = document.getElementById("role");
const biomeInput = document.getElementById("biome");
const hpInput = document.getElementById("hp");
const attackInput = document.getElementById("attack");
const defenseInput = document.getElementById("defense");
const speedInput = document.getElementById("speed");

let editingId = null;

roleInput.addEventListener("change", () => {
  if (roleInput.value === "player") {
    biomeInput.disabled = true;
    biomeInput.value = "";
  } else {
    biomeInput.disabled = false;
  }
});


// Evento submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
    const data = {
    name: nameInput.value.trim(),
    type: typeInput.value
      ? typeInput.value.split(",").map(t => t.trim())
      : [],
    role: roleInput.value,
    biome: roleInput.value === "enemy" ? biomeInput.value : undefined,
    stats: {
      hp: Number(hpInput.value),
      attack: Number(attackInput.value),
      defense: Number(defenseInput.value),
      speed: Number(speedInput.value)
    }
  };

  if (!data.name || !data.role ||
    !data.stats.hp || !data.stats.attack ||
    !data.stats.defense || !data.stats.speed || !data.biome) {
  alert("Todos los campos deben completarse");
  return;
  }


  console.log("Enviando:", data);

  if (editingId) {
  await fetch(`/pokemon/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  editingId = null;

} else {
  await fetch("/pokemon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

loadPokemons();
form.reset();
});

// Cargar lista
async function loadPokemons() {
  const res = await fetch("/pokemon");
  const pokemons = await res.json();

  window.currentPokemons = pokemons;

  list.innerHTML = pokemons.map(p => {
    const pokemonName = p.name.toLowerCase().replace(/\s+/g, "-");
    const imageUrl = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemonName}.png`;

    return `
      <div class="pokemon-card">
        <div>
          <strong>${p.name}</strong><br>
          Tipo: ${p.type.join(", ")}<br>
          Rol: ${p.role}<br>
          ${p.role === "enemy" ? `Bioma: ${p.biome}<br>` : ""}
          HP: ${p.stats.hp} |
          ATK: ${p.stats.attack} |
          DEF: ${p.stats.defense} |
          SPD: ${p.stats.speed}
          <br><br>

          <button class="edit-btn" data-id="${p._id}">Editar</button>
          <button class="delete-btn" data-id="${p._id}">Eliminar</button>
        </div>
        <img src="${imageUrl}" width="120">
      </div>
    `;
  }).join("");

  // 🔥 Agregar listeners después de renderizar
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;

      if (!confirm("¿Seguro que quieres eliminar este Pokémon?")) return;

      await fetch(`/pokemon/${id}`, {
        method: "DELETE"
      });

      loadPokemons();
    });
  });

  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      editPokemon(id);
    });
  });
}


function editPokemon(id) {
  const pokemon = window.currentPokemons.find(p => p._id === id);
  if (!pokemon) return;

  editingId = id;

  nameInput.value = pokemon.name;
  typeInput.value = pokemon.type.join(", ");
  roleInput.value = pokemon.role;
  biomeInput.value = pokemon.biome || "";

  hpInput.value = pokemon.stats.hp;
  attackInput.value = pokemon.stats.attack;
  defenseInput.value = pokemon.stats.defense;
  speedInput.value = pokemon.stats.speed;
}



// Cargar al iniciar
loadPokemons();
