// getting document elements
const inputEl = document.getElementById("input");
const addBtn = document.getElementById("add-todo-btn");
const emptyLiContainer = document.querySelector(".empty-list-container");
let allLiContainers = document.querySelectorAll(".list-container");
let tabBtns = document.querySelectorAll(".tab-btn");
let todosTextsEl = document.querySelectorAll(".todo-text");
let roundsEl = document.querySelectorAll(".round");
let removeBtn = document.querySelectorAll(".remove-btn");

// variables

// the item id
let id = 1;
// the all list container
const allLiContainer = allLiContainers[0];

// array for getting new items's objects
let itemsObjArr = [];

//functions

// function for removing item
function removeItem(e) {
  const todoItem = e.currentTarget.parentElement;
  todoItem.classList.add("remove-list");
  setTimeout(function () {
    todoItem.remove();
  }, 500);
}

// function for removing active btns
// and list containers
function removeActive() {
  tabBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  allLiContainers.forEach((container) => {
    container.classList.add("hidden");
  });
}

// function for adding all the events
//for the new item
function newItemAddEvents(item) {
  const roundEl = item.firstChild;
  const textEl = item.children[1];
  const removeBtn = item.children[2];
  roundEl.addEventListener("click", () => {
    roundEl.classList.toggle("checked");
    textEl.classList.toggle("todo-completed");
  });
  textEl.addEventListener("click", () => {
    textEl.classList.toggle("todo-completed");
    roundEl.classList.toggle("checked");
  });
  removeBtn.addEventListener("click", removeItem);
}

// function for creating the item
function createItem(todo) {
  const li = document.createElement("li");
  li.setAttribute("id", id);
  li.setAttribute("class", "todo-item");
  li.innerHTML = `<span class="round">
  <img src="images/icon-check.svg" alt="check-icon" />
  </span>
  <p class="todo-text">
     ${todo}
  </p>
  <button class="btn remove-btn">
  <img src="images/icon-cross.svg" alt="cross-icon" />
  </button>`;
  allLiContainer.appendChild(li);
  newItemAddEvents(li);
}

// creating the list item class
class ListItem {
  constructor(todo, completed = false, id) {
    this.todo = todo;
    this.completed = completed;
    this.id = id;
  }
  toggleCompleted() {
    this.completed = !this.completed;
  }
}

// event lisnteners

// ckecking if the user clicked on the enter keyn
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputEl.value !== "") {
    // creating a new item object every time users clicks
    const item = new ListItem(inputEl.value, this.completed, id);
    // getting the todo text from the item object
    const todo = Object.values(item)[0];
    // calling the create item function
    createItem(todo);
    // pushing the item object to the array
    itemsObjArr.push(item);
    // resetting the input
    inputEl.value = "";
    // incrementing the id
    id++;
    console.log(itemsObjArr);
  }
});

// checking if the user clicked on the add button
addBtn.addEventListener("click", () => {
  if (inputEl.value !== "") {
    // creating a new item object every time users clicks
    const item = new ListItem(input.value, this.completed, id);
    // getting the todo text from the item object
    const todo = Object.values(item)[0];
    // calling the create item function
    createItem(todo);
    // pushing the item object to the array
    itemsObjArr.push(item);
    // resetting the input
    inputEl.value = "";
    // incrementing the id
    id++;
  }
});

// adding the active class to the selected btn
// and toggle list containers
tabBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    removeActive();
    btn.classList.add("active");
    console.log(allLiContainers[i]);
    allLiContainers[i].classList.remove("hidden");
  });
});

// checking if user completed default todos by
//clicking  on the checker
roundsEl.forEach((round) => {
  round.addEventListener("click", (e) => {
    const parentEl = e.currentTarget.parentElement;
    const textEl = parentEl.children[1];
    round.classList.toggle("checked");
    textEl.classList.toggle("todo-completed");
  });
});

// checking if user completed default todos by
//clicking  on the item
todosTextsEl.forEach((text) => {
  text.addEventListener("click", (e) => {
    const todoItem = e.currentTarget.parentElement;
    const roundEl = todoItem.children[0];
    text.classList.toggle("todo-completed");
    roundEl.classList.toggle("checked");
  });
});

// ckecking if the user removed default items
removeBtn.forEach((btn) => {
  btn.addEventListener("click", removeItem);
});
