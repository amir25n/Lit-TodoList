import {
  html,
  css,
  customElement,
  state,
  AlwatrDummyElement,
} from "@alwatr/element";

type items = {
  text: string;
  completed: boolean;
};

@customElement("todo-list")
export class todoList extends AlwatrDummyElement {
  static override styles = css`
    .completed {
      text-decoration-line: line-through;
      color: hsl(0, 50%, 50%);
    }
  `;

  @state()
  private todoList: items[] = [];

  override render(): unknown {
    return html`
      <ul>
        ${this.todoList.map(
          (item: items) =>
            html` <li
              @click=${() => this.toggleTodoCompleted(item)}
              class=${item.completed ? "completed" : ""}
            >
              ${item.text}
            </li>`
        )}
      </ul>
      <input class="input1" type="text" />
      <button @click=${this.addTodoItem}>add</button>
    `;
  }

  private addTodoItem(): void {
    const input = this.renderRoot.querySelector(
      ".input1"
    ) as HTMLInputElement | null;

    if (input != null) {
      this.todoList = [
        ...this.todoList,

        { text: input.value, completed: false },
      ];

      input.value = "";
    }
  }

  private toggleTodoCompleted(item: items): void {
    item.completed = !item.completed;

    this.requestUpdate();
  }
}
