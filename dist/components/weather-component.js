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
class WeatherComponent extends HTMLElement {
    constructor() {
        super();
        const user = localStorage.getItem("user");
        this.userData = user ? JSON.parse(user) : {};
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
    <style>
      .container {
        background: rgb(235, 235, 235);
        margin: 1rem;
        display: flex;
        flex-direction: column;
      }

      .search {
        display: flex;
        width: 100%;
        gap: 1rem;
        align-items: end;
        justify-content: center;
        padding: .5rem;
      }

      input {
        border: none;
        outline: none;
        border-radius: 8px;
        min-height: 1.9rem;
      }

      input:focus {
        outline: 2px solid lightblue; 
        box-shadow: 1px 1px 5px rgba(0, 0, 255, 0.5);
        border: none;
      }
      label {
        display:flex;
        flex-direction:column;
      }

      .search-btn {
        border: none;
        background: lightgreen;
        color: #111;
        border-radius: 6px;
        padding: .5rem;
        cursor: pointer;
        transition: box-shadow .3s ease;
      }

      .search-btn:hover {
        box-shadow: 1px 1px 5px #999;
      }

      .weather {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        min-height: 200px;
      }

      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(0, 0, 0, 0.1);
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    </style>
    <div class="container">
      <div id="weather" class="weather">
        <h2 style="margin:auto;padding:.25rem">Search a zip code to display weather</h2>
        </div>
        <div id="noKeyText" style="color:red;text-align:center"></div>
      <div class="search">
      <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" ></a>
        <label for="zipCode">Search a zip code
          <input id="zipCode" /></label>
        <button class="search-btn">Search</button>
      </div>
    </div>
    `;
    }
    connectedCallback() {
        var _a;
        document.addEventListener("formSubmitted", (e) => __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => {
                var _a;
                const user = localStorage.getItem("user");
                this.userData = user ? JSON.parse(user) : {};
                const noKeyTextElement = this.shadowRoot.getElementById("noKeyText");
                if (!((_a = this.userData) === null || _a === void 0 ? void 0 : _a.weatherKey)) {
                    noKeyTextElement.innerHTML = `<span>No API Key found, set the key in your Profile</span>`;
                }
                else {
                    noKeyTextElement.innerHTML = "";
                }
            }, 200);
        }));
        const searchButton = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("button");
        searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const zipCode = (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("input")) === null || _b === void 0 ? void 0 : _b.value;
            if (zipCode) {
                this.shadowRoot.getElementById("weather").innerHTML = `<div style="margin: auto;" class="spinner"></div>`;
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    const res = zipCode ? yield this.getWeather(zipCode) : null;
                    if (res === null || res === void 0 ? void 0 : res.success) {
                        this.displayWeather(res === null || res === void 0 ? void 0 : res.data);
                    }
                    else {
                        this.shadowRoot.getElementById("weather").innerHTML = `<div style="margin: auto;">Error getting Weather</div>`;
                    }
                }), 1500);
            }
        }));
    }
    getWeather(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield fetch(`https://api.weatherapi.com/v1/forecast.json?q=${zipCode}&key=${(_a = this.userData) === null || _a === void 0 ? void 0 : _a.weatherKey}&days=3`);
            if (response.ok) {
                return { success: true, data: yield response.json() };
            }
            else
                return { success: false };
        });
    }
    displayWeather(data) {
        var _a, _b;
        const forecastHtml = (_b = (_a = data.forecast) === null || _a === void 0 ? void 0 : _a.forecastday) === null || _b === void 0 ? void 0 : _b.map((day) => {
            return `
        <div>
          <img
            src="https:${day.day.condition.icon}"
            alt="Weather Icon for ${day.date}"
          />
          <p>${new Date(day.date).toLocaleDateString("en-US", {
                timeZone: "UTC",
            })}</p>
          <p>${day.day.avgtemp_f}°F</p>
          <p>${day.day.condition.text}</p>
        </div>
      `;
        }).join("");
        this.shadowRoot.getElementById("weather").innerHTML = forecastHtml;
    }
}
customElements.define("weather-component", WeatherComponent);
