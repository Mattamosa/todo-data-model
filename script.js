class Todo {
  constructor(todoID, todoText, todoComplete, todoCategory, todoDueDate) {
    this.todoID = todoID;
    this.todoText = todoText;
    this.todoComplete = todoComplete;
    this.todoCategory = todoCategory;
    this.todoDueDate = todoDueDate;
  }
}

// Examples from original code (Category not implemented)
const todos = [
  new Todo(0, "Get Groceries", false, "Shopping", "2024-09-01"),
  new Todo(1, "Basic Todo App", true, "Chores", "2024-08-28")
];

const inputField = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todosList = document.querySelector(".todoList");
const clearCompletedButton = document.querySelector(".clearCompletedButton");
const taskCount = document.querySelector("#pendingTasks");

// Render todos
function renderTodos() {
  todosList.innerHTML = '';
  todos.forEach((todo, index) => {
    const newListItem = document.createElement("li");
    newListItem.className = 'todo-item';

    // Checkbox to mark as complete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.todoComplete;
    checkbox.className = 'todo-checkbox';
    checkbox.addEventListener("change", () => {
      todo.todoComplete = checkbox.checked;
      renderTodos();
    });

    // Todo text
    const todoText = document.createElement('span');
    todoText.innerText = todo.todoText;
    todoText.className = 'todo-text';
    if (todo.todoComplete) {
      todoText.classList.add('completed');
    }

    // Edit button
    const editButton = document.createElement('button');
    editButton.innerText = "Edit";
    editButton.className = 'todo-edit-btn';
    editButton.addEventListener("click", () => {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.todoText;
      editInput.className = 'edit-input';

      // Save button
      const saveButton = document.createElement("button");
      saveButton.innerText = "Save";
      saveButton.className = 'save-btn';

      // Replace elements
      newListItem.replaceChild(editInput, todoText);
      newListItem.replaceChild(saveButton, editButton);

      saveButton.addEventListener("click", () => {
        todo.todoText = editInput.value;
        renderTodos();
      });
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.className = 'todo-delete-btn';
    deleteButton.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
    });

    newListItem.appendChild(checkbox);
    newListItem.appendChild(todoText);
    newListItem.appendChild(editButton);
    newListItem.appendChild(deleteButton);

    todosList.appendChild(newListItem);
  });

  // Update pending tasks count
  updatePendingTasksCount();
}

// Update pending tasks count
function updatePendingTasksCount() {
  const pendingCount = todos.filter(todo => !todo.todoComplete).length;
  taskCount.innerText = `You have ${pendingCount} pending task${pendingCount !== 1 ? 's' : ''}.`;
}

// Add New todo
function addTodo() {
  const newTodoText = inputField.value.trim();
  if (newTodoText !== "") {
    const newTodo = new Todo(
      todos.length,
      newTodoText,
      false
    );
    todos.push(newTodo);
    inputField.value = "";
    renderTodos();
  }
}

// Clears completed todos
function clearCompletedTodos() {
  const incompleteTodos = todos.filter(todo => !todo.todoComplete);
  todos.length = 0;
  todos.push(...incompleteTodos);
  renderTodos();
}

// Event listeners for adding todos and clearing completed todos
addButton.addEventListener("click", addTodo);
inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});
clearCompletedButton.addEventListener("click", clearCompletedTodos);

// Render on page load
renderTodos();