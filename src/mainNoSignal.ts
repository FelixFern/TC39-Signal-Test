import "./style.css";

type Util = Window &
	typeof globalThis & {
		addTodo: () => void;
		deleteTodo: (val: number) => void;
		increment: () => void;
		decrement: () => void;
	};

let todo: string[] = [];
const todoInput = document.querySelector(".todo-input") as HTMLInputElement;

(window as Util).addTodo = () => {
	todo = [...todo, todoInput?.value ?? ""];
	todoInput.value = "";
	TodoList();
};

(window as Util).deleteTodo = (delIndex: number) => {
	todo = [...todo.filter((_, index) => index !== delIndex)];
	TodoList();
};

const TodoList = () => {
	console.log("rerendered Todo List");

	const parent = document.querySelector(".list") as HTMLDivElement;
	parent.innerHTML = `
        <ul>
          ${todo
				.map(
					(val, index) =>
						`<li onclick="deleteTodo(${index})">${val}</li>`
				)
				.join("")}
        </ul>
      `;
};

TodoList();

let count = 0;

(window as Util).increment = () => {
	count = count + 1;
	Counter();
};

(window as Util).decrement = () => {
	count = count - 1;
	Counter();
};

const Counter = () => {
	console.log("rerendered Counter");

	const speedyCounter = count * 2;

	const parent = document.querySelector(".counter") as HTMLParagraphElement;
	parent.innerHTML = `${count} | ${speedyCounter}`;
};

Counter();
