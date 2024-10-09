class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // 직접 템플릿을 포함
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .home-btn {
                    display: flex;
                    height: 50px;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--surface-primary);
                }
                .home-btn img {
                    width: 140px;
                    height: 36px;
                }
            </style>
    
            <a class="home-btn" href="index.html">
                <img src="/data/kinderseoul_logo.svg" alt="">
            </a>
            <slot name="title-slot"></slot>
        `;
        const content = template.content.cloneNode(true);
        this.shadowRoot.appendChild(content);
    }
}
customElements.define('header-component', HeaderComponent);
