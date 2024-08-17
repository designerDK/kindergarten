class CustomTemplate extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.templateID = this.getAttribute("templateID");
        const template = document.getElementById(this.templateID)
        const content = template.content.cloneNode(true);
        this.shadowRoot.appendChild(content);
    }
}

customElements.define('custom-template', CustomTemplate)