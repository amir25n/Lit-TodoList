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
    body {
      background-color: gray;
    }

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

    .add-box {
      background-color: red;
      display: flex;
      justify-content: center;
      gap: 10px;
      position: fixed;
      bottom: calc(2 * var(--sys-spacing-track));
      right: 0px;
      width: 100%;
      align-items: center;
      background-color: transparent;
    }

    .add-box .newItem {
      text-align: center;
      border-radius: var(--sys-radius-xlarge);
      height: calc(3 * var(--sys-spacing-track));
      padding: calc(2 * var(--sys-spacing-track));
      border: none;
      box-shadow: var(--sys-elevation-4);
      font-size: 1em;
    }

    .add-box button alwatr-icon {
      font-size: 3em;
      color: var(--sys-color-primary);
      transitio: color 200ms;
    }

    .add-box button alwatr-icon:hover {
      color: white;
    }

    .add-box button {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid var(--sys-color-primary);
      background-color: white;
      transition: background-color 300ms, border 300ms;
    }

    .add-box button:hover {
      background-color: var(--sys-color-primary);
      border: 2px solid white;
    }

    .date-box {
      display: flex;
      justify-content: center;
    }

    .date-box section {
      font-family: var(--sys-typescale-headline-small-font-family-name);
      font-size: var(--sys-typescale-headline-small-font-size);
      font-weight: var(--sys-typescale-headline-small-font-weight);
      line-height: var(--sys-typescale-headline-small-line-height);
      letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
      color: var(--sys-color-primary);
      margin: 0;
    }

    .date-box section span {
      margin: 0;
      font-family: var(--sys-typescale-body-large-font-family-name);
      font-size: var(--sys-typescale-body-large-font-size);
      font-weight: var(--sys-typescale-body-large-font-weight);
      line-height: var(--sys-typescale-body-large-line-height);
      letter-spacing: var(--sys-typescale-body-large-letter-spacing);
      color: var(--sys-color-primary-40);
    }

    .check-box {
      color: var(--sys-color-primary);
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
        <section>
          ${date.toLocaleDateString("fa", weekday)}<span
            >,${date.toLocaleDateString("fa", MD)}</span
          >
        </section>
      </div>
      ${todosOrMessage}
      <div class="add-box">
        <input type="text" class="newItem " placeholder="Write a new task" />
        <button>
          <alwatr-icon name="add" @click=${this.addTodo}>Add</alwatr-icon>
        </button>
        <label class="check-box">
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
