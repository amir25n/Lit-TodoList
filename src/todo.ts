import { LitElement, html, css } from "lit";
import { customElement, state, query } from "lit/decorators.js";

type items = {
    text: string;
    completed: boolean;
};
@customElement("todo-list")
export class todoList extends LitElement {
    @state()
    private _listItems: items[] = [];

    render() {
        return html`
            <ul>
                ${this._listItems.map((item: items) => html` <li @click=${() => this.addCls(item)} class=${item.completed ? "completed" : ""}>${item.text}</li>`)}
            </ul>
            <input class="input1" type="text" />
            <button @click=${this.addItem}>add</button>
        `;
    }

    static styles = css`
        .completed {
            text-decoration-line: line-through;
            color: hsl(0, 50%, 50%);
        }
    `;
    @query(".input1")
    input!: HTMLInputElement;

    addItem() {
        this._listItems = [...this._listItems, { text: this.input.value, completed: false }];
        this.input.value = "";
    }

    addCls(item: items) {
        item.completed = !item.completed;
        this.requestUpdate();
    }
}
