import { html, css, customElement, state, AlwatrDummyElement } from "@alwatr/element";

import "@alwatr/icon";

type items = {
    text: string;
    completed: boolean;
};

@customElement("todo-list")
export class todoList extends AlwatrDummyElement {
    @state()
    private _listitems: items[] = [];
    private hiddenItem: boolean = false;

    static override styles = css`
        .todo-card {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            box-shadow: var(--sys-elevation-3);
            border-radius: var(--sys-radius-small);
            padding: var(--sys-spacing-track);
        }

        .list {
            padding: 0;
            font-size: 2em;
        }

        ul {
            padding: 0;
            margin: 0;
        }

        .check {
            /* margin-right: calc(2 * var(--sys-spacing-track)); */
            height: 2em;
            width: 2em;
        }

        .complated {
            color: hsl(0, 50%, 50%);
            text-decoration-line: line-through;
        }

        .todo {
            display: flex;
            padding: 8px;
            justify-content: center;
        }

        .todo alwatr-icon {
            font-size: calc(4 * var(--sys-spacing-track));
            /* font-size: 2em; */
            margin: 0px 4px 4px 4px;
        }

        .todo p {
            margin: 5px;
        }

        .template {
            display: flex;
            justify-content: center;
            gap: 10px;
        }
    `;
    override render() {
        const items: items[] = this.hiddenItem
            ? this._listitems.filter((item) => {
                  return item.completed == false;
              })
            : this._listitems;
        const todos = html`
            <ul>
                ${items.map(
                    (item) =>
                        html`
                            <li class="todo-card">
                                <input type="checkbox" class="check" @change=${() => this.toggleCompleted(item)} />
                                <div class=${item.completed ? "complated list" : "list"}>${item.text}</div>
                            </li>
                        `
                )}
            </ul>
        `;
        const message = html`
            <div class="todo">
                <p>You have nothing to do</p>
                <alwatr-icon name="checkmark-circle"></alwatr-icon>
            </div>
        `;
        const todosOrMessage = items.length > 0 ? todos : message;

        return html`
            ${todosOrMessage}

            <div class="template">
                <input type="text" class="newItem disp" />
                <button @click=${this.addTodo} class="disp">Add</button>
                <label class="disp"> <input type="checkbox" @change=${this.toggleHiddenItem} /> Hide complated</label>
            </div>
        `;
    }
    addTodo() {
        const input: HTMLInputElement | null = this.renderRoot.querySelector(".newItem");
        if (input != null && input.value != "") {
            this._listitems = [...this._listitems, { text: input.value, completed: false }];
            input.value = "";
        }
    }
    toggleCompleted(item: items) {
        item.completed = !item.completed;
        this.requestUpdate();
    }
    toggleHiddenItem(e: Event) {
        this.hiddenItem = (e.target as HTMLInputElement).checked;
    }
}
