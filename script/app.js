// getting document elements
const html = document.documentElement;
const inputEl = document.getElementById("input");
const themesBtn = document.querySelector(".toggle-themes-btn");
const addBtn = document.getElementById("add-todo-btn");
const allLiContainer = document.querySelector(".all-list-container");
const emptyLiContainer = document.querySelector(".empty-list-container");
let allLiContainers = document.querySelectorAll(".list-container");
let tabBtns = document.querySelectorAll(".tab-btn");
let roundsEl = document.querySelectorAll(".round");
let removeBtn = document.querySelectorAll(".remove-btn");

// variables
const todosArr = getLocalStorage();
let id = 5;

//functions

// function for toggling themes
function toggleThemes(e) {
  const { theme } = html.dataset;
  if (theme === "light") {
    e.target.src = "images/icon-sun.svg";
    e.target.alt = "Sun image";
    html.dataset.theme = "dark";
  } else {
    e.target.src = "images/icon-moon.svg";
    e.target.alt = "Moon image";
    html.dataset.theme = "light";
  }
}

// functon for creating the todo
function createTodo(todoObj) {
  const { id, todo, completed } = todoObj;
  const li = document.createElement("li");
  li.setAttribute("id", id);
  li.setAttribute("class", "todo-item");
  li.innerHTML = `<span class="round ${completed ? "checked" : ""}">
  <img src="images/icon-check.svg" alt="check-icon" />
  </span>
  <p class="todo-text ${completed ? "todo-completed" : ""}">
     ${todo}
  </p>
  <button class="btn remove-btn">
  <img src="images/icon-cross.svg" alt="cross-icon" />
  </button>`;
  todoAddEvents(li);
  allLiContainer.appendChild(li);
}

//adding events to the todo
function todoAddEvents(item) {
  const roundEl = item.querySelector(".round");
  const textEl = item.querySelector(".todo-text");
  const removeBtn = item.querySelector(".remove-btn");
  roundEl.addEventListener("click", () => {
    textEl.classList.toggle("todo-completed");
    roundEl.classList.toggle("checked");
    checkCompleted(item, todosArr);
  });
  textEl.addEventListener("click", () => {
    textEl.classList.toggle("todo-completed");
    roundEl.classList.toggle("checked");
    checkCompleted(item, todosArr);
  });
  removeBtn.addEventListener("click", removeItem);
}

//setting local storage
function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//getting local storage
function getLocalStorage() {
  // saving new todos items
  const todos = localStorage.getItem("todos");
  if (todos) {
    return JSON.parse(todos);
  } else {
    // default todos items if there is no new items
    const defaultTodos = [
      {
        todo: "Completed online Javascript course",
        completed: true,
        id: 1,
      },
      {
        todo: "Jog around the park 3x",
        completed: false,
        id: 2,
      },
      {
        todo: "10 minutes meditation",
        completed: false,
        id: 3,
      },
      {
        todo: "Read for 1 hour",
        completed: false,
        id: 4,
      },
    ];
    // setting local storage for the default items
    setLocalStorage("todos", defaultTodos);
    return defaultTodos;
  }
}

// checking if the item is completed
// and change the todos objects array
function checkCompleted(item, todos) {
  todos.forEach((todo) => {
    if (todo.id === parseInt(item.getAttribute("id"))) {
      todo.completed = !todo.completed;
      setLocalStorage("todos", todosArr);
    }
  });
}

// function for checking if the item is removed
// and change the todos objects array
function checkRemoved(item, todos) {
  todos.forEach((todo, i) => {
    if (todo.id === parseInt(item.getAttribute("id"))) {
      todos.splice(i, 1);
      setLocalStorage("todos", todosArr);
    }
  });
}

// function for adding items to the  todos array
function addItem(todo) {
  if (todo !== "") {
    const todoObj = {
      todo: todo,
      completed: false,
      id: id++,
    };
    todosArr.push(todoObj);
    // setting local storage for items
    setLocalStorage("todos", todosArr);
    // creating the todo object
    createTodo(todoObj);
    inputEl.value = "";
  }
}

// function for removing items
function removeItem(e) {
  const todoItem = e.currentTarget.parentElement;
  todoItem.classList.add("remove-list");
  checkRemoved(todoItem, todosArr);
  setTimeout(function () {
    todoItem.remove();
  }, 500);
}

// removing active btns and list containers
function removeActive() {
  tabBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  allLiContainers.forEach((container) => {
    container.classList.add("hidden");
  });
}

// adding default todos
todosArr.forEach((item) => {
  createTodo(item);
});

// toggling tab btns and list containers
tabBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    removeActive();
    btn.classList.add("active");
    allLiContainers[i].classList.remove("hidden");
  });
});

// event listeners

themesBtn.addEventListener("click", toggleThemes);

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addItem(inputEl.value);
  }
});

addBtn.addEventListener("click", () => {
  addItem(inputEl.value);
});
