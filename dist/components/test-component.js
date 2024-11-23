"use strict";
class TestComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const container = document.createElement("div");
        container.classList.add("container");
        container.classList.add("testy");
        container.setAttribute("name", "Test-Container");
        container.textContent = "Hello, I am a custom web component!";
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "styles.css";
        shadow.appendChild(link);
        const style = document.createElement("style");
        style.textContent = `
      .container {
        cursor:pointer;
        font-size: 1.5rem;
        color: white;
        background-color: #228844;
        padding: 10px;
        text-align: center;
        margin: 2rem auto;
        width: 25rem;
        min-height: 5rem;
        opacity: 1;
        transform: translateX(0);
        transition: opacity .7s ease, background-color .4s ease, transform .6s ease;
      }
      .container:hover {
        background-color: #226622;
        transform: scale(1.1);
      }
      .container:active {
        background-color: #008800;
      }
      .slide {
        opacity: 0;
        transform: translateX(-100%);
      }
      @media (max-width: 500px) {
        .container {
          width: 15rem;
        }
      }
    `;
        shadow.appendChild(style);
        shadow.appendChild(container);
        container.addEventListener("click", (e) => {
            if (!confirm("I'm Leaving"))
                return;
            container.classList.add("slide");
            setTimeout(() => {
                container.classList.remove("slide");
                container.textContent = "I'm Back!";
                setTimeout(() => {
                    container.textContent = "Hello, I am a custom web component!";
                }, 1500);
            }, 1200);
        });
    }
}
customElements.define("test-component", TestComponent);
