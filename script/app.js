const todosItemsEl = document.querySelectorAll(".todo-item");
const todosTextsEl = document.querySelectorAll(".todo-text");
const roundsEl = document.querySelectorAll(".round");
const removeBtn = document.querySelectorAll(".remove-btn");

// checking if user clicked on the checker

function removeItem(e) {
  const todoItem = e.currentTarget.parentElement;
  todoItem.classList.add("remove-list");
  setTimeout(function () {
    todoItem.classList.add("hidden");
  }, 500);
}
roundsEl.forEach((round) => {
  round.addEventListener("click", (e) => {
    const parentEl = e.currentTarget.parentElement;
    const textEl = parentEl.children[1];
    round.classList.toggle("checked");
    textEl.classList.toggle("todo-completed");
  });
});

// checking if the user clicked on item text
todosTextsEl.forEach((text) => {
  text.addEventListener("click", (e) => {
    const todoItem = e.currentTarget.parentElement;
    const roundEl = todoItem.children[0];
    text.classList.toggle("todo-completed");
    roundEl.classList.toggle("checked");
  });
});

// ckecking if the user removed item
removeBtn.forEach((btn) => {
  btn.addEventListener("click", removeItem);
});
