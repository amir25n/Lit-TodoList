import {
  html,
  css,
  customElement,
  state,
  AlwatrDummyElement,
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
  private hiddenItem: boolean = false;

  static override styles = css`
    .item-todo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--sys-elevation-2);
      border-radius: var(--sys-radius-small);
      padding: calc(2 * var(--sys-spacing-track));
      background-color: var(--sys-color-surface);
      transition: background-color 300ms, box-shadow 300ms, color 300ms;
      margin-top: var(--sys-spacing-track);
      user-select: none;
      color: var(--sys-color-primary);
    }

    .item-todo:hover {
      background-color: var(--sys-color-primary-60);
      box-shadow: var(--sys-elevation-4);
      color: black;
    }

    .item-todo:active {
      background-color: var(--sys-color-primary-60);
      box-shadow: var(--sys-elevation-4);
      color: black;
    }

    .item-todo div {
      padding: 0;
      font-family: var(--sys-typescale-body-medium-font-family-name);
      font-size: var(--sys-typescale-body-medium-font-size);
      font-weight: var(--sys-typescale-body-medium-font-weight);
      line-height: var(--sys-typescale-body-medium-line-height);
      letter-spacing: var(--sys-typescale-body-medium-letter-spacing);
    }

    .item-todo input {
      height: 2em;
      width: 2em;
      border-radius: 100%;
      cursor: pointer;
    }

    ul {
      padding: 0;
      margin: 0;
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

    .date-box {
    }

    .date-box div {
      font-family: var(--sys-typescale-headline-small-font-family-name);
      font-size: var(--sys-typescale-headline-small-font-size);
      font-weight: var(--sys-typescale-headline-small-font-weight);
      line-height: var(--sys-typescale-headline-small-line-height);
      letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
      color: var(--sys-color-primary);
    }

    .date-box div span {
      font-family: var(--sys-typescale-body-large-font-family-name);
      font-size: var(--sys-typescale-body-large-font-size);
      font-weight: var(--sys-typescale-body-large-font-weight);
      line-height: var(--sys-typescale-body-large-line-height);
      letter-spacing: var(--sys-typescale-body-large-letter-spacing);
      color: var(--sys-color-primary-40);
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
              <li class="item-todo">
                <input
                  type="checkbox"
                  @change=${() => this.toggleCompleted(item)}
                />
                <div class=${item.completed ? "complated" : ""}>
                  ${item.text}
                </div>
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

    const date = new Date();

    const weekday: object = {
      weekday: "long",
    };

    const MD: object = {
      month: "long",
      day: "numeric",
    };
    return html`
      <div class="date-box">
        <div>
          ${date.toLocaleDateString("fa", weekday)}<span
            >,${date.toLocaleDateString("fa", MD)}</span
          >
        </div>
      </div>
      ${todosOrMessage}
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
    this.requestUpdate();
  }
}
