import Service from '@/service'
const ajax = new Service()
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
                <div class="content"></div>
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
                    // 只需要创建一个template即可，其他位置若需要，克隆来使用
                    var templateElem = document.getElementById('supplierListTemplate');
                    var content = templateElem.content.cloneNode(true);
                    // 使用自定义属性，接受用户信息
                    content.querySelector('.container>.title').innerText = this.getAttribute('title');
                    // 请求后端渲染 DOM String
                    SupplierList.queryDemoString().then(response => {
                        // response即为 DOM String，插入当前DOM节点
                        content.querySelector('.container>.content').innerHTML = response;
                        // EMIT_SELECT该方法名用于服务端渲染和web-component通信
                        window.EMIT_SELECT = event => {
                            this.dispatchEvent(new CustomEvent('emit', { detail: JSON.parse(event.target.dataset.props || "{}") }));
                        }
                        // 将拼接好的DOM String挂载到用户DOM树中去
                        this.attachShadow({ mode: 'closed' }).appendChild(content);
                    })
                }
            })
    }

    static queryDemoString() {
        return ajax.EventList({})
    }

}
