"use strict";
class AnimatedComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const container = document.createElement("div");
        container.classList.add("container");
        container.classList.add("testy");
        container.textContent = "Hello, I am a custom web component! Click Me!";
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
      .container:hover:not(.slide) {
        background-color: #226622;
        transform: scale(1.1);
      }
      .container:active:not(.slide) {
        background-color: #008800;
      }
      .container.slide {
        transform: translateX(-200%);
        opacity:0;
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
            container.textContent = "I'm Leaving!";
            setTimeout(() => { container.classList.add("slide"); }, 800);
            setTimeout(() => {
                container.classList.remove("slide");
                container.textContent = "I'm Back!";
                setTimeout(() => {
                    container.textContent = "Hello, I am a custom web component! Click Me!";
                }, 2100);
            }, 1800);
        });
    }
}
customElements.define("animated-component", AnimatedComponent);
