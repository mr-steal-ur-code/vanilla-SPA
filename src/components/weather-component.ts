class WeatherComponent extends HTMLElement {
  userData: UserData;
  constructor() {
    super();
    const user = localStorage.getItem("user");
    this.userData = user ? JSON.parse(user) : {};
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
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
    this.shadowRoot
      ?.querySelector("button")
      ?.addEventListener("click", async () => {
        const zipCode = this.shadowRoot?.querySelector("input")?.value;
        if (zipCode) {
          this.shadowRoot!.getElementById(
            "weather"
          )!.innerHTML = `<div style="margin: auto;" class="spinner"></div>`;
          setTimeout(async () => {
            const data = zipCode ? await this.getWeather(zipCode) : null;
            if (data) {
              this.displayWeather(data);
            } else {
              this.shadowRoot!.getElementById(
                "weather"
              )!.innerHTML = `<div style="margin: auto;">City Not Found</div>`;
            }
          }, 1500);
        }
      });
  }
  async getWeather(zipCode: string) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${zipCode}&key=${this.userData?.weatherKey}&days=3`
    );
    if (response.ok) {
      return await response.json();
    }
  }
  displayWeather(data: any) {
    const forecastHtml = data.forecast?.forecastday
      ?.map((day: any) => {
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
      })
      .join("");
    this.shadowRoot!.getElementById("weather")!.innerHTML = forecastHtml;
  }
}

customElements.define("weather-component", WeatherComponent);
