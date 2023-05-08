const todoButton = document.querySelector(".addButton");
const todoList = document.querySelector(".list");
const filterOption = document.querySelector(".filter-todo");
const todoInput = document.querySelector(".todo-input");
const yesBtn = document.querySelector(".yes");
const noBtn = document.querySelector(".no");
const deleteModule = document.querySelector(".deleteModule");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addToDo(event) {
  event.preventDefault();
  if (todoList.childElementCount <= 6) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.classList.add("item");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("uncompleted");

    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa-solid fa-check fa-2xl"></i>';
    checkButton.classList.add("checkIt");
    todoDiv.append(checkButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-regular fa-trash-can fa-xl"></i>';
    trashButton.classList.add("deleteIt");
    todoDiv.append(trashButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pencil fa-xl"></i>';
    editButton.classList.add("editIt");
    todoDiv.append(editButton);

    todoDiv.append(newTodo);

    todoList.append(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";

    editButton.addEventListener("click", editTodo);

    function editTodo() {
      const todo = this.parentElement;
      const todoText = todo.querySelector(".item").textContent;
      const newTodoText = prompt("Edit your To Do item:", todoText);
      if (newTodoText) {
        todo.querySelector(".item").textContent = newTodoText;
      }
    }
  } else if ((todoList.childElementCount = 6)) {
    turnOn();
  }
  function backdropOn() {
    const backdropEl = document.querySelector(".backdrop");
    backdropEl.classList.add("visible");
  }
  function noticeOn() {
    const noticeEl = document.querySelector(".notice");
    noticeEl.classList.add("visible");
  }
  function turnOn() {
    backdropOn();
    noticeOn();
  }
  function backdropOff() {
    const backdropEl = document.querySelector(".backdrop");
    backdropEl.classList.remove("visible");
  }
  function noticeOff() {
    const noticeEl = document.querySelector(".notice");
    noticeEl.classList.remove("visible");
  }
  function turnOff() {
    backdropOff();
    noticeOff();
  }
  const noticeButton = document.getElementById("noticeBtn");
  noticeButton.addEventListener("click", turnOff);
}
function deleteCheck(event) {
  const item = event.target;
  const todo = item.parentElement;
  const items = [...todoList.children];
  const index = items.indexOf(todo);

  if (item.classList[0] === "deleteIt") {
    todo.classList.add("slide");
    todo.addEventListener("transitionend", function () {
      item.addEventListener("transitionend", function () {
        item.remove();
        for (let i = index; i < items.length; i++) {
          const itemLabel = items[i].querySelector(".item");
          itemLabel.innerText = `item${i}`;
        }
        removeLocalTodos(todo);
      });
      todo.remove();
    });
  } else if (item.classList[0] === "checkIt") {
    todo.classList.toggle("completed");
    const checkButton = todo.querySelector(".checkIt");
    if (todo.classList.contains("completed")) {
      checkButton.innerHTML = '<i class="fa-solid fa-check-double fa-xl"></i>';
    } else {
      checkButton.innerHTML = '<i class="fa-solid fa-check fa-2xl"></i>';
    }
  }
}

function filterTodo() {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    if (todo && todo.classList) {
      switch (filterOption.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.classList.add("item");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("uncompleted");

    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa-solid fa-check fa-2xl"></i>';
    checkButton.classList.add("checkIt");
    todoDiv.append(checkButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-regular fa-trash-can fa-xl"></i>';
    trashButton.classList.add("deleteIt");
    todoDiv.append(trashButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pencil fa-xl"></i>';
    editButton.classList.add("editIt");
    todoDiv.append(editButton);

    todoDiv.append(newTodo);

    todoList.append(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded", getLocalTodos);

const clearStorageEl = document.querySelector(".clearStorage");
clearStorageEl.addEventListener("click", () => {
  localStorage.clear();
});

const tooltip = document.querySelector(".tooltip");

clearStorageEl.addEventListener("mouseover", () => {
  tooltip.classList.add("show");
});

clearStorageEl.addEventListener("mouseout", () => {
  tooltip.classList.remove("show");
});
