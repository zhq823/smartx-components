export default class SupplierList {

    static install() {
        const template = `
            <template id="supplierListTemplate">
                <div class="container">
                    <p class="title"></p>
                </div>
            </template>
        `
        customElements.define('supplier-list',
            class extends HTMLElement {
                constructor() {
                    super();
                    var wrapper = document.createElement("div");
                    wrapper.innerHTML = template;
                    var fragment = new DocumentFragment()
                    fragment.appendChild(wrapper);
                    document.body.append(fragment)
                }

                connectedCallback() {
                    var templateElem = document.getElementById('supplierListTemplate');
                    var content = templateElem.content.cloneNode(true);
                    content.querySelector('.container>.title').innerText = this.getAttribute('title')
                    this.attachShadow({ mode: 'closed' }).appendChild(content);
                }
            })
    }

}
