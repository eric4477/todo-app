// const todosItemsEl = document.querySelectorAll(".todo-item");
const todosTextsEl = document.querySelectorAll(".todo-text");
const roundsEl = document.querySelectorAll(".round");

roundsEl.forEach((round) => {
  round.addEventListener("click", (e) => {
    const parentEl = e.currentTarget.parentElement;
    const textEl = parentEl.children[1];
    round.classList.toggle("checked");
    textEl.classList.toggle("todo-completed");
  });
});

todosTextsEl.forEach((text) => {
  text.addEventListener("click", (e) => {
    const parentEl = e.currentTarget.parentElement;
    const roundEl = parentEl.children[0];
    text.classList.toggle("todo-completed");
    roundEl.classList.toggle("checked");
  });
});
