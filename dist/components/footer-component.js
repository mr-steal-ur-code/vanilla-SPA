"use strict";
class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
    <style>
      .parent {
        text-align:center;
        background: #f1f1f1;
        width:100%;
        height:6em;
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
      }
      a {
        background: none;
        padding: 0.5rem 1rem;
        color: #007BFF;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: color 0.3s ease-out;
        text-decoration: none;
    }

    a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #0056b3;
        transition: width 0.3s ease-out;
    }

    a:hover {
        color: #0056b3;
    }

    a:hover::after {
        width: 100%;
    }
    </style>
    <div class="parent">
    <h5 style="margin:0">Made By CJ</h5>
    <a target="_blank" href="https://github.com/mr-steal-ur-code/vanilla-SPA">View on Github</a>
    </div>
    `;
    }
}
customElements.define("footer-component", FooterComponent);
