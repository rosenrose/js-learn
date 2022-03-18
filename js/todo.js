const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoUl = document.querySelector("#todo-list");
let todoList = [];

todoForm.addEventListener("submit", handleTodoSubmit);

const TODOS_KEY = "todos";
const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos) {
  todoList = JSON.parse(savedTodos);
  todoList.forEach(drawTodo);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value.trim();
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  todoList.push(newTodoObj);
  drawTodo(newTodoObj);
  saveTodo();
}

function drawTodo(newTodo) {
  const todoTemplate = document.querySelector("#todo-template").content.cloneNode(true);
  const li = todoTemplate.querySelector("li");
  const span = todoTemplate.querySelector("span");
  const button = todoTemplate.querySelector("button");

  li.id = newTodo.id;
  span.textContent = newTodo.text;
  button.textContent = "❌";
  button.addEventListener("click", deleteTodo);
  todoUl.append(li);
}

function deleteTodo(event) {
  const li = event.target.parentNode;
  const id = li.id;
  console.log(id);

  li.remove();
  todoList = todoList.filter((todo) => todo.id != id);
  saveTodo();
}

function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
}
