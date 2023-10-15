const inputEl = document.getElementById("input");
const addBtn = document.getElementById("add-todo-btn");
const allListContainer = document.querySelector(".all-list-container");
let todosItemsEl = document.querySelectorAll(".todo-item");
let todosTextsEl = document.querySelectorAll(".todo-text");
let roundsEl = document.querySelectorAll(".round");
let removeBtn = document.querySelectorAll(".remove-btn");
let id = 1;

// array for getting new items's objects
let itemsObjArr = [];

// function for removing item
function removeItem(e) {
  const todoItem = e.currentTarget.parentElement;
  todoItem.classList.add("remove-list");
  setTimeout(function () {
    todoItem.remove();
  }, 500);
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
  allListContainer.appendChild(li);
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

// ckecking if the user clicked on the enter key
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
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
  }
});

// checking if the user clicked on the add button
addBtn.addEventListener("click", () => {
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
