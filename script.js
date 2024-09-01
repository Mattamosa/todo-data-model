class Todo {
  constructor(todoID, todoText, todoComplete, todoCategory, todoDueDate) {
    this.todoID = todoID;
    this.todoText = todoText;
    this.todoComplete = todoComplete;
    this.todoCategory = todoCategory;
    this.todoDueDate = todoDueDate;
  }
}

const todos = [
  new Todo(0, "Get Groceries", false, "Shopping", "2024-09-01"),
  new Todo(1, "Take out the trash", true, "Chores", "2024-08-28")
];

// Selects DOM elements
const inputField = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todosList = document.querySelector(".todoList");

// Function to render todos
function renderTodos() {
  todosList.innerHTML = '';
  todos.forEach(todo => {
    const newListItem = document.createElement("li");
    newListItem.innerText = todo.todoText;
    // * Need to work on this *
    // `${todo.todoText} 
    // (Due: ${todo.todoDueDate}, 
    // Category: ${todo.todoCategory})`;
    if (todo.todoComplete) {
      newListItem.classList.add("done");
    }
    newListItem.innerHTML += `
      <span><button class="deleteBtn">Delete</button></span>
    `; // Add <editBtn> here as well
    todosList.appendChild(newListItem);
  });

  // Event listeners for delete buttons
  document.querySelectorAll(".deleteBtn").forEach(button => {
    button.addEventListener("click", (event) => {
      const listItem = event.target.closest("li");
      const todoText = listItem.innerText.replace("Delete", "").trim();
      const todoIndex = todos.findIndex(todo => todo.todoText === todoText);
      if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        renderTodos();
      }
    });
  });
}

// Add a new todo
function addTodo() {
  const newTodoText = inputField.value.trim();
  if (newTodoText !== "") {
    const newTodo = new Todo(
      todos.length,
      newTodoText,
      false,
      "", // Due date - Add later
      "" // Category - Add later
    );
    todos.push(newTodo);
    renderTodos();
    inputField.value = "";
  }
}

// Add todo Clicks & Enter
addButton.addEventListener("click", addTodo);
inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

// Render on page load
renderTodos();

