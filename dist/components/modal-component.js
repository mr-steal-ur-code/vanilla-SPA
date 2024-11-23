"use strict";
class ModalComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
    <div class="backdrop">
      <div class="container">
      <span class="close-btn"></span>
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </div>
    </div>
    <style>
      .container {
        position:relative;
        background: #ffefcb;
        min-width: 60%;
        margin: 1rem auto;
        padding: 1rem;
        border-radius: 6px;
        transform: translateY(-200%);
        transition: transform .6s ease;
      }
      .container.open {
        transform: translateY(0);
      }
      .close-btn {
        position: absolute;
        top: 2px;
        right: 2px;
        cursor: pointer;
        display: inline-block;
        width: 30px;  
        height: 30px;
        border-radius: 50%;  
        background: #fff; 
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background 0.3s ease;
      }

      .close-btn:before {
        content: "X";  
        font-size: 20px;  
        color: red;
        transition: transform 0.3s ease, color 0.3s ease;
      }

      .close-btn:hover {
        background: red; 
      }

      .close-btn:hover:before {
        transform: rotate(180deg);  
        color: #fff; 
      }
      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.6s ease, visibility 0s 0.6s;
      }
      .backdrop.open {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.8s ease;
      }
      @media (max-width:500px) {
        .container {
          padding:0;
          min-width:100%;
        }
      }
    </style>
    `;
        this.backdrop = shadow.querySelector(".backdrop");
        this.container = shadow.querySelector(".container");
        this.closeBtn = shadow.querySelector(".close-btn");
    }
    connectedCallback() {
        this.backdrop.addEventListener("click", (event) => {
            if (event.target === this.backdrop) {
                this.hide();
            }
        });
        this.closeBtn.addEventListener("click", (event) => {
            if (event.target === this.closeBtn) {
                this.hide();
            }
        });
    }
    disconnectedCallback() {
        this.backdrop.removeEventListener("click", this.hide);
        this.closeBtn.removeEventListener("click", this.hide);
    }
    show() {
        this.backdrop.classList.add("open");
        this.container.classList.add("open");
    }
    hide() {
        this.backdrop.classList.remove("open");
        this.container.classList.remove("open");
    }
}
customElements.define("modal-component", ModalComponent);
