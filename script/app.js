// getting document elements
const html = document.documentElement;
const inputEl = document.getElementById("input");
const themesBtn = document.querySelector(".toggle-themes-btn");
const addBtn = document.getElementById("add-todo-btn");
const clearBtn = document.getElementById("clear-btn");
const allLiContainer = document.querySelector(".all-list-container");
const emptyLiContainer = document.querySelector(".empty-list-container");
const itemsLeftEl = document.getElementById("items-left");
let allLiContainers = document.querySelectorAll(".list-container");
const completedLiContainer = allLiContainers[2];
const activeLiContainer = allLiContainers[1];
let tabBtns = document.querySelectorAll(".tab-btn");
let removeBtn = document.querySelectorAll(".remove-btn");

// variables
const todosArr = getLocalStorage();
let completedItems = completedLiContainer.childNodes;
let activeItems = activeLiContainer.childNodes;
let allItems = allLiContainer.childNodes;

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
function createTodo(todoObj, container) {
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
  container.appendChild(li);
}

//adding events to the todo
function todoAddEvents(item) {
  const removeBtn = item.querySelector(".remove-btn");
  removeBtn.addEventListener("click", (e) => {
    removeItem(e);
    removeCompleted(item);
    removeActive(item);
  });
  const roundEl = item.querySelector(".round");
  const textEl = item.querySelector(".todo-text");
  roundEl.addEventListener("click", () => {
    textEl.classList.toggle("todo-completed");
    roundEl.classList.toggle("checked");
    checkCompleted(item, todosArr);
    checkActive(item, todosArr);
    otherTodosEvents(completedItems, completedLiContainer);
    otherTodosEvents(activeItems, activeLiContainer);
    trackItems(todosArr);
  });
  textEl.addEventListener("click", () => {
    textEl.classList.toggle("todo-completed");
    roundEl.classList.toggle("checked");
    checkCompleted(item, todosArr);
    checkActive(item, todosArr);
    otherTodosEvents(completedItems, completedLiContainer);
    otherTodosEvents(activeItems, activeLiContainer);
    trackItems(todosArr);
  });
}
// function for changing the completed and
// active items events functionality
function otherTodosEvents(items, container) {
  items = container.childNodes;
  items.forEach((item) => {
    // Clone the item
    let clone = item.cloneNode(true);
    // Add event listener only to the remove button of the cloned item
    const removeBtn = clone.querySelector(".remove-btn");
    removeBtn.addEventListener("click", function (e) {
      // checking if the item is in the all list container
      allItems.forEach((item) => {
        const todoItem = e.currentTarget.parentElement;
        // if found remove the item from the all list container
        if (item.id === todoItem.id) {
          allLiContainer.removeChild(item);
        }
      });
      removeItem(e);
    });
    // Replace the original item with the cloned item
    item.parentNode.replaceChild(clone, item);
  });
}

// function for adding items to the  todos array
function addItem(todo) {
  if (todo !== "") {
    // Get the id from local storage
    let id = localStorage.getItem("id");

    // If there was no saved id, initialize it to 5
    if (id === null) {
      id = 5;
    } else {
      // Convert the id to a number
      id = parseInt(id);
    }

    const todoObj = {
      todo: todo,
      completed: false,
      id: id,
    };
    todosArr.push(todoObj);
    // setting local storage for items
    setLocalStorage("todos", todosArr);
    // creating the todo object
    createTodo(todoObj, allLiContainer);
    createTodo(todoObj, activeLiContainer);

    // Call otherTodosEvents function for activeItems
    otherTodosEvents(activeItems, activeLiContainer);

    trackItems(todosArr);
    inputEl.value = "";

    // Increment the id and save it to local storage
    id++;
    setLocalStorage("id", id);
  }
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
    // returning the default todos array
    return defaultTodos;
  }
}

// function for checking the active item
function checkActive(item, todos) {
  // checking if the item is completed
  const completedTodo = todos.filter(
    (todo) => todo.id === Number(item.id) && todo.completed
  );
  // checking if the item is not completed
  const activeTodo = todos.filter(
    (todo) => todo.id === Number(item.id) && !todo.completed
  );
  //  if the item is not completed create this item and append it to the active tab
  activeTodo.forEach((todo) => {
    createTodo(todo, activeLiContainer);
  });
  // if the item is completed removing the active item from the acive tab
  completedTodo.forEach((todo) => {
    activeItems.forEach((item) => {
      if (todo.id === Number(item.id)) {
        activeLiContainer.removeChild(item);
      }
    });
  });
}

// checking if the item is completed and change the todos objects array
function checkCompleted(item, todos) {
  todos.forEach((todo) => {
    if (todo.id === parseInt(item.getAttribute("id"))) {
      todo.completed = !todo.completed;
      setLocalStorage("todos", todosArr);
      // if the item is completed
      if (todo.completed) {
        // create this item in the completed list container
        createTodo(todo, completedLiContainer);
      } else {
        // if not remove this item from the completed list container
        removeCompleted(item);
      }
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

// function for removing items
function removeItem(e) {
  const todoItem = e.currentTarget.parentElement;
  todoItem.classList.add("remove-list");
  checkRemoved(todoItem, todosArr);
  trackItems(todosArr);
  setTimeout(function () {
    todoItem.remove();
  }, 500);
}

function removeActive(item) {
  activeItems.forEach((actItem) => {
    if (actItem.id === item.getAttribute("id")) {
      activeLiContainer.removeChild(actItem);
    }
  });
}

// removing completed items from the completed list container
function removeCompleted(item) {
  completedItems.forEach((compItem) => {
    if (compItem.id === item.getAttribute("id")) {
      completedLiContainer.removeChild(compItem);
    }
  });
}
// removing all completed items in the  completed
// list container and in the all container
function removeAllCompleted() {
  completedItems.forEach((CompItem) => {
    CompItem.classList.add("remove-list");
    checkRemoved(CompItem, todosArr);
    trackItems(todosArr);
    setTimeout(function () {
      CompItem.remove();
    }, 500);
    allItems.forEach((item) => {
      if (CompItem.id === item.id) {
        item.classList.add("remove-list");
        setTimeout(function () {
          item.remove();
        }, 500);
      }
    });
  });
}
// tracking the left items
function trackItems(todos) {
  let leftItems = todos.filter((item) => item.completed === false);
  itemsLeftEl.textContent = leftItems.length;
  // Save the count to local storage
  setLocalStorage("leftItemsCount", leftItems.length);
}

// removing active btns and tabs
function removeActiveTabs() {
  tabBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  allLiContainers.forEach((container) => {
    container.classList.add("hidden");
  });
}

// toggling tab btns and list containers
tabBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    removeActiveTabs();
    btn.classList.add("active");
    allLiContainers[i].classList.remove("hidden");
  });
});

// event listeners

themesBtn.addEventListener("click", toggleThemes);

// setting
window.onload = function () {
  // adding default todos
  todosArr.forEach((item) => {
    createTodo(item, allLiContainer);
  });
  // checking all active items and append
  // them to the active tab
  todosArr.forEach((todo) => {
    if (!todo.completed) {
      createTodo(todo, activeLiContainer);
    }
  });

  // checking all the completed items
  // and append them to the completed tab
  todosArr.forEach((todo) => {
    if (todo.completed) {
      createTodo(todo, completedLiContainer);
    }
  });
  // adding diffrent events to the active and completed tab
  otherTodosEvents(completedItems, completedLiContainer);
  otherTodosEvents(activeItems, activeLiContainer);

  // Get the count from local storage
  let savedCount = localStorage.getItem("leftItemsCount");
  if (savedCount !== null) {
    itemsLeftEl.textContent = savedCount;
  }
  // filtering all completed items
};

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addItem(inputEl.value);
  }
});

addBtn.addEventListener("click", () => {
  addItem(inputEl.value);
});

clearBtn.addEventListener("click", removeAllCompleted);
