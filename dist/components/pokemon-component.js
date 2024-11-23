"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PokemonComponent extends HTMLElement {
    constructor() {
        super();
        const user = localStorage.getItem("user");
        this.userData = user ? JSON.parse(user) : {};
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
    <style>
      .pokemon-container {
          text-align: center;
          margin: 1.5rem auto 8rem auto;
          max-width: 550px;
          border: 2px solid #ccc;
          border-radius: 10px;
          padding: .5rem;
          background: #f8f9fa;
        }
        .search-container {
          display: flex;
          flex-direction: row;
          gap: .5rem;
          align-items: stretch; 
        }

        input[type="text"] {
          flex: 1;
          padding: .75rem 1.25rem;
          margin-bottom: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          height: 100%; 
        }

        input[type="text"]:focus {
          border:none;
          outline: 1px #007bff solid;
        }

        button {
          padding: .60rem 1.25rem;
          font-size: 1rem;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 1rem;
          transition: background-color .5s ease;
          height: 100%;  
        }
        button:hover {
          background-color: #0056b3;
        }
        p {
          font-size: 1rem;
          color: #555;
        }

        .pokemon-image {
          border-radius: 10px;
          max-width: 100%;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }

        .pokemon-image:hover {
          transform: scale(1.05);
        }

        .pokemon-name {
          font-family: 'Press Start 2P', cursive;
          font-size: 2rem;
          color: #ff6347;
          text-transform: uppercase;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
          margin-bottom: 1rem;
        }

        .stats {
          display:flex;
          flex-direction:column;
          gap:.5rem;
          align-items:center;
          background-color: #f4f4f9;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .stats p {
          font-size: 1.1rem;
          color: #333;
          margin: 0.5rem 0;
          text-align:left;
          min-width:12rem;
        }

        .stats ul {
          display:flex;
          flex-direction:column;
          text-align:left;
          align-items:center;
          margin:0 auto;
        }

        ul li {
          font-size: 1rem;
          color: #555;
          min-width:12rem;
        }

        .audio-container {
          margin-top: 1.5rem;
          text-align: center;
        }

        audio {
          border-radius: 10px;
          background-color: #ffcc00;
          padding: 0.5rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        }

        audio:hover {
          background-color: #ff9b00;
          cursor: pointer;
        }
        
    </style>  
    <div class="pokemon-container">
    <div class="search-container">
    <input type="text" placeholder="Enter Pokémon name or number" id="search-input" />
    <button id="search-btn">Search</button>
    </div>
    <div class="info" id="pokemon-info"></div>
  </div>
    `;
    }
    connectedCallback() {
        var _a;
        if ((_a = this.userData) === null || _a === void 0 ? void 0 : _a.favPokemon) {
            this.searchPokemon(this.userData.favPokemon);
            const searchBtn = this.shadowRoot.querySelector("#search-btn");
            if (searchBtn) {
                searchBtn.addEventListener("click", this.handleSearchClick.bind(this));
            }
            document.addEventListener("formSubmitted", (e) => __awaiter(this, void 0, void 0, function* () {
                setTimeout(() => {
                    var _a;
                    const user = localStorage.getItem("user");
                    this.userData = user ? JSON.parse(user) : {};
                    if ((_a = this.userData) === null || _a === void 0 ? void 0 : _a.favPokemon) {
                        this.searchPokemon(this.userData.favPokemon);
                        const searchBtn = this.shadowRoot.querySelector("#search-btn");
                        if (searchBtn) {
                            searchBtn.addEventListener("click", this.handleSearchClick.bind(this));
                        }
                    }
                }, 200);
            }));
        }
    }
    disconnectedCallback() {
        const searchBtn = this.shadowRoot.querySelector("#search-btn");
        if (searchBtn) {
            searchBtn.removeEventListener("click", this.handleSearchClick.bind(this));
        }
    }
    handleSearchClick() {
        const input = this.shadowRoot.querySelector("#search-input");
        if (!input)
            return;
        const query = input.value.trim();
        if (query) {
            this.searchPokemon(query);
        }
    }
    searchPokemon(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const pokemonInfo = this.shadowRoot.querySelector("#pokemon-info");
            if (!pokemonInfo)
                return;
            pokemonInfo.innerHTML = `<p>Loading...</p>`;
            try {
                const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
                if (!response.ok)
                    throw new Error("Pokémon not found");
                const data = yield response.json();
                const cryUrl = `https://pokemoncries.com/cries/${data.id}.mp3`;
                pokemonInfo.innerHTML = `
      <img src="${data.sprites.front_default}" alt="${data.name}" class="pokemon-image" />
      <h2 class="pokemon-name">${data.name} (#${data.id})</h2>
      <div class="stats">
        <p><strong>Type:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>Height:</strong> ${data.height / 10} m</p>
        <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
        <p><strong>Stats:</strong></p>
        <ul>
          ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("")}
        </ul>
      </div>
      <div class="audio-container">
        <audio controls id="pokemonAudio">
          <source src="${cryUrl}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
      `;
                const audioEl = this.shadowRoot.getElementById("pokemonAudio");
                if (audioEl) {
                    audioEl.addEventListener("canplaythrough", () => {
                        audioEl.volume = 0.2;
                    });
                }
            }
            catch (error) {
                pokemonInfo.innerHTML = `<p>Error: ${error.message}</p>`;
            }
        });
    }
}
customElements.define("pokemon-component", PokemonComponent);
