class FormComponent extends HTMLElement {
  userData: UserData;
  constructor() {
    super();
    this.userData = JSON.parse(localStorage.getItem("user") || "") || {};
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
<style>
  .form-container {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    max-height: 25rem;
    max-width: 25rem;
    margin: 2rem auto;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
  }
  input {
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #d4d4d4;
    border-radius: 8px;
    font-size: 1rem;
    color: #333333;
    background: #f9f9f9;
    transition: all 0.3s ease-in-out;
  }
  input:focus {
    outline: none;
    border-color: #0078d7;
    background: #ffffff;
    box-shadow: 0 0 4px rgba(0, 120, 215, 0.3);
  }
  label {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #555555;
  }
  button {
    cursor: pointer;
    color: #ffffff;
    padding: 0.75rem;
    background: linear-gradient(135deg, #0078d7, #005bb5);
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 0.3s ease-in-out, transform 0.2s ease;
  }
  button:hover {
    background: linear-gradient(135deg, #005bb5, #004899);
    transform: scale(1.02);
  }
  button:active {
    background: linear-gradient(135deg, #004899, #003777);
    transform: scale(0.98);
  }
</style>
      <form id="form-component" class="form-container">
      <label for="name">Name</label>
      <input required id="name" value="${this.userData?.name || ''}"/>
      <label for="email">E-Mail</label>
      <input id="email" value="${this.userData?.email || ''}"/>
      <label for="weatherKey">Weather API Key</label>
      <input type="password" id="weatherKey" value="${this.userData?.weatherKey || ''}"/>
      <button type="submit">Submit</button>
      </form>
      `;
    const form = this.shadowRoot!.querySelector("form");
    form?.addEventListener("submit", this.handleSubmit);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const form = event?.target;
    const inputs = event.target.querySelectorAll("input");
    const formData: { [key: string]: any } = {};
    inputs.forEach((input: { id: string, value: any }) => {
      input?.id ? formData[input?.id] = input.value : null;
    });
    const submitEvent = new CustomEvent("formSubmitted", {
      detail: formData,
      bubbles: true,
      composed: true,
    });
    const toastEvent = new CustomEvent("toast", {
      detail: "Profile Updated Successfully",
      bubbles: true,
      composed: true,
    });
    this.userData = JSON.parse(localStorage.getItem("user") || "") || { name: "", email: "", weatherKey: "" };
    document.dispatchEvent(toastEvent);
    document.dispatchEvent(submitEvent);
  }
}

customElements.define("form-component", FormComponent);
