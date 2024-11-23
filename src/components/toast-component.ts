class ToastComponent extends HTMLElement {
  private container: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        .container {
          position: fixed;
          text-align:center;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          margin: 0 auto;
          min-height: 2rem;
          min-width: 10rem;
          font-size: 1.2rem;
          color: white;
          background-color: #333;
          padding: 1rem 2rem;
          border-radius: 6px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          opacity: 0;
          transform: translate(-50%, 400%);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .container.show {
          opacity: 1;
          transform: translate(-50%, 0);
        }
        @media (max-width: 500px) {
          .container {
            font-size: 1rem;
            width: 80%;
          }
        }
      </style>
      <div id="toast" class="container"></div>
    `;
    this.container = shadow.querySelector(".container")!;
  }

  show(message: string) {
    this.container.textContent = message;
    this.container.classList.add("show");

    setTimeout(() => {
      this.dismiss();
    }, 3000);
  }

  dismiss() {
    this.container.classList.remove("show");
  }
}

customElements.define("toast-component", ToastComponent);
