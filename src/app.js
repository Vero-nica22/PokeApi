    async function fecthPokemonList() {
        const pokemonList = document.getElementById("pokemonList");
        for (let i = 1; i <= 150; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const pokemon = await response.json();
    
            const speciesResponse = await fetch(pokemon.species.url);
            const speciesData = await speciesResponse.json();
            const description = speciesData.flavor_text_entries
            .find((entry) => entry.language.name === "es")
            .flavor_text.replace(/\f/g, " ");
    
            const card = document.createElement("div");
            card.className =
            "bg-gradient-to-r from-yellow-200 to-red-200 shadow-xl rounded-lg w-58 h-64 flex flex-col items-center justify-end p-4 relative shadow-lg p-2 text-center hover:scale-105 transition transform duration-300";
            card.setAttribute("data-name", pokemon.name);
    
            const types = pokemon.types
            .map(
                (t) =>
                `<span class="bg-yellow-100 text-yellow-700 px-1 rounded mx-1">${t.type.name.toUpperCase()}</span>`
            )
            .join(" ");
    
            card.innerHTML = `
            <div class="font-['Bangers'] text-xl w-44 h-14 object-contain absolute -top-7 transition-transform hover:scale-120 hover:-translate-y-10">
                <img src="${
                    pokemon.sprites.other["official-artwork"].front_default
                }" alt="${pokemon.name}" class="w-32 mx-auto " />
                <h2 class="text-xl font-sans">${pokemon.name.toUpperCase()}</h2>
                <div class="text-sm  w-34 h-4 mt-1 p-1.8 rounded-lg text-gray-700 text-center">
                    <div class="grid grid-cols-2 gap-4">
                        <p class = text-yellow-600><span class="font-sans">Peso:</span> ${pokemon.weight}</p>
                        <p><span class="font-bold">Altura:</span> ${pokemon.height}</p>
                        <p><span class="font-sans text-red-500">🗡️Ataque:</span> ${pokemon.stats[1].base_stat}</p>
                        <p><span class=" font-sans text-blue-400">🛡️Defensa:</span> ${pokemon.stats[2].base_stat}</p>
                    </div>
                    <div class="text-base mt-2 bg-yellow-200 px-3 py-1 rounded-lg inline-block font-sans">${types}</div>
                </div>

                `;
            pokemonList.appendChild(card);
        } catch (error) {
            console.error("Error al obtener Pokemon:" + error);
        }
        }
    }
    
    function filterPokemon() {
        const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();
        const cards = document.querySelectorAll("#pokemonList > div");
    
        cards.forEach((card) => {
        const name = card.getAttribute("data-name");
        if (name.includes(searchInput)) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
        });
    }
    
    fecthPokemonList();
