import { Signal } from "signal-polyfill";
import { effect } from "./effect";
import "./style.css";

type Util = Window &
	typeof globalThis & {
		addTodo: () => void;
		deleteTodo: (val: number) => void;
		increment: () => void;
		decrement: () => void;
	};

const todo = new Signal.State<string[]>([]);
const todoInput = document.querySelector(".todo-input") as HTMLInputElement;

(window as Util).addTodo = () => {
	todo.set([...todo?.get(), todoInput?.value ?? ""]);
	todoInput.value = "";
};

(window as Util).deleteTodo = (delIndex: number) => {
	todo.set([...todo.get().filter((_, index) => index !== delIndex)]);
};

const TodoList = () => {
	console.log("rerendered Todo List");

	const parent = document.querySelector(".list") as HTMLDivElement;
	parent.innerHTML = `
    <ul>
      ${todo
			.get()
			.map(
				(val, index) => `<li onclick="deleteTodo(${index})">${val}</li>`
			)
			.join("")}
    </ul>
  `;
};

const count = new Signal.State<number>(0);
const speedyCounter = new Signal.Computed(() => count.get() * 2);

(window as Util).increment = () => {
	count.set(count.get() + 1);
};

(window as Util).decrement = () => {
	count.set(count.get() - 1);
};

const Counter = () => {
	console.log("rerendered Counter");

	const parent = document.querySelector(".counter") as HTMLParagraphElement;
	parent.innerHTML = `${count.get()} | ${speedyCounter.get()}`;
};

effect(() => TodoList());
effect(() => Counter());
