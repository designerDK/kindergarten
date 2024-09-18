class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // 직접 템플릿을 포함
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
            footer {
                height: 46px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: var(--surface-gray);
                padding: var(--large-padding);
            }
        
            footer img {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
            }
        
            .footer-info {
                color: var(--texticon-darkgray);
            }
            </style>
            <footer>
                <div class="footer-info text-body-small-m">ⓒ 2024. Designer DK All rights reserved.</div>
                <img src="/data/dk_logo.svg" alt="">
                <div class="footer-info">Contact : tupacalypse@naver.com</div>
            </footer>
        `;
        const content = template.content.cloneNode(true);
        this.shadowRoot.appendChild(content);
    }
}

customElements.define('footer-component', FooterComponent);
