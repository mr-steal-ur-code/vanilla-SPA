class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
    <style>
      .parent {
        text-align:center;
        background: #f1f1f1;
        position: sticky;
        z-index:99999;
        top:0;
        width:100%;
        height:6em;
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center; 
      }
      button {
        background: none;
        padding: 0.5rem 1rem;
        color: #007BFF;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: color 0.3s ease-out;
    }

    button::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #0056b3;
        transition: width 0.3s ease-out;
    }

    button:hover {
        color: #0056b3;
    }

    button:hover::after {
        width: 100%;
    }
    </style>
    <div class="parent">
    <h2 style="margin:0">Vanilla SPA</h2>
    <nav>
    <button onclick="showView('home')">Home</button>
    <button onclick="showView('about')">About</button>
    <button onclick="showView('profile')">Profile</button>
  </nav>
    </div>
    `;
  }
}
customElements.define("header-component", HeaderComponent);