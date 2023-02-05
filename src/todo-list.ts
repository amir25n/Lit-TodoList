import {
  html,
  css,
  customElement,
  state,
  AlwatrDummyElement,
  property,
} from "@alwatr/element";

import "@alwatr/icon";

type items = {
  text: string;
  completed: boolean;
};

@customElement("todo-list")
export class todoList extends AlwatrDummyElement {
  @state()
  private _listitems: items[] = [];

  @property()
  hiddenItem: boolean = false;

  static override styles = css`
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
      font-size: 2em;
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
            html` <li
              @click=${() => this.toggleCompleted(item)}
              class=${item.completed ? "complated" : ""}
            >
              ${item.text}
            </li>`
        )}
      </ul>
    `;
    const message = html`
      <p>You have nothing to do</p>
      <alwatr-icon name="checkmark-circle"></alwatr-icon>
    `;
    const todosOrMessage = items.length > 0 ? todos : message;

    return html`
      <div class="todo">${todosOrMessage}</div>

      <div class="template">
        <input type="text" class="newItem disp" />
        <button @click=${this.addTodo} class="disp">Add</button>
        <label class="disp">
          <input type="checkbox" @change=${this.toggleHiddenItem} /> Hide
          complated</label
        >
      </div>
    `;
  }
  addTodo() {
    const input: HTMLInputElement | null =
      this.renderRoot.querySelector(".newItem");
    if (input != null && input.value != "") {
      this._listitems = [
        ...this._listitems,
        { text: input.value, completed: false },
      ];
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
