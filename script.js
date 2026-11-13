const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const todoList = document.querySelector("#todo-list");
const doneList = document.querySelector("#done-list");

function createTask(text, isDone = false) {
  const task = document.createElement("li");
  task.textContent = text;
  task.tabIndex = 0;
  task.setAttribute("role", "button");

  function updateLabel(completed) {
    task.setAttribute(
      "aria-label",
      completed
        ? `${text}. Completata. Premi Invio o clicca per spostarla in Da fare.`
        : `${text}. Da fare. Premi Invio o clicca per spostarla in Fatto.`
    );
  }

  function toggleTask() {
    const completed = task.parentElement === todoList;
    (completed ? doneList : todoList).appendChild(task);
    updateLabel(completed);
  }

  updateLabel(isDone);
  task.addEventListener("click", toggleTask);

  task.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleTask();
    }
  });

  (isDone ? doneList : todoList).appendChild(task);
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (!taskText) return;

  createTask(taskText);
  taskInput.value = "";
  taskInput.focus();
});
