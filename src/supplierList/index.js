export default class SupplierList {

    static install() {
        const HTMLTxt = `
            <section class="container">
                <style>
                    * {
                        margin: 0px;
                    }
                    :host {
                        border: 1px solid #CCCCCC;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 200px;
                        overflow: hidden;
                        box-sizing: border-box;
                    }
                    .container {
                        width: 100%;
                        height: 100%;
                    }
                </style>
                <p class="title"></p>
            </section>
        `
        customElements.define('supplier-list',
            class extends HTMLElement {
                constructor() {
                    super();
                    const template = document.createElement('template');
                    template.setAttribute("id", "supplierListTemplate");
                    template.innerHTML = HTMLTxt;
                    var fragment = new DocumentFragment()
                    fragment.appendChild(template);
                    document.body.append(fragment)
                }

                connectedCallback() {
                    var templateElem = document.getElementById('supplierListTemplate');
                    var content = templateElem.content.cloneNode(true);
                    content.querySelector('.container>.title').innerText = this.getAttribute('title')
                    content.querySelector('.container').addEventListener("click", () => {
                        this.dispatchEvent(new CustomEvent('emit', { detail: "事件广播" }));
                    })
                    this.attachShadow({ mode: 'closed' }).appendChild(content);
                }

            })
    }

}
