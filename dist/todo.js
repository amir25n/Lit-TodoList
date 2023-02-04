import { LitElement, html, css } from "lit";
import { customElement, state, query } from "lit/decorators.js";
let todoList = class todoList extends LitElement {
    constructor() {
        super(...arguments);
        this._listItems = [];
    }
    render() {
        return html `
            <ul>
                ${this._listItems.map((item) => html ` <li @click=${() => this.addCls(item)} class=${item.completed ? "completed" : ""}>${item.text}</li>`)}
            </ul>
            <input class="input1" type="text" />
            <button @click=${this.addItem}>add</button>
        `;
    }
    addItem() {
        this._listItems = [...this._listItems, { text: this.input.value, completed: false }];
        this.input.value = "";
    }
    addCls(item) {
        item.completed = !item.completed;
        this.requestUpdate();
    }
};
todoList.styles = css `
        .completed {
            text-decoration-line: line-through;
            color: hsl(0, 50%, 50%);
        }
    `;
__decorate([
    state()
], todoList.prototype, "_listItems", void 0);
__decorate([
    query(".input1")
], todoList.prototype, "input", void 0);
todoList = __decorate([
    customElement("todo-list")
], todoList);
export { todoList };
