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
    !data.stats.defense || !data.stats.speed) {
  alert("Todos los campos deben completarse");
  return;
  }


  console.log("Enviando:", data);

  await fetch("/pokemon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  form.reset();
  loadPokemons();
});

// Cargar lista
async function loadPokemons() {
  const res = await fetch("/pokemon");
  const pokemons = await res.json();

  list.innerHTML = pokemons.map(p => {

    const pokemonName = p.name.toLowerCase().replace(/\s+/g, "-");
    const imageUrl = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemonName}.png`;

    return `        
      <div class="pokemon-card">
        <div class="pokemon-info">
          <strong>${p.name}</strong><br>
          Tipo: ${p.type.join(", ")}<br>
          Rol: ${p.role}<br>
          ${p.role === "enemy" ? `Bioma: ${p.biome}<br>` : ""}
          HP: ${p.stats.hp} |
          ATK: ${p.stats.attack} |
          DEF: ${p.stats.defense} |
          SPD: ${p.stats.speed}
        </div>
        <div class="pokemon-image">
          <img src="${imageUrl}" alt="${p.name}">
        </div>
      </div>
    `;
  }).join("");
}
// Cargar al iniciar
loadPokemons();
