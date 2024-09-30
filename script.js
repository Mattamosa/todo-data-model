class Todo {
  constructor(todoID, todoText, todoComplete) {
    this.todoID = todoID;
    this.todoText = todoText;
    this.todoComplete = todoComplete;
  }
}

// Object structure for categories and todos
const todoData = {
  Shopping: [new Todo(0, "Get Groceries", false, "2024-09-01")],
  Chores: [new Todo(1, "Wash Dishes", true, "2024-08-28")],
};

const inputField = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todosList = document.querySelector(".todoList");
const clearCompletedButton = document.querySelector(".clearCompletedButton");
const taskCount = document.querySelector("#pendingTasks");
const categorySelect = document.querySelector("#categorySelect");
const newCategoryInput = document.querySelector("#newCategoryInput");
const addCategoryButton = document.querySelector("#addCategoryButton");
const categoryList = document.querySelector("#categoryList");

// Populate category dropdown
function populateCategoryDropdown() {
  categorySelect.innerHTML = "";
  Object.keys(todoData).forEach((categoryName) => {
    const option = document.createElement("option");
    option.value = categoryName;
    option.innerText = categoryName;
    categorySelect.appendChild(option);
  });
}

// Populate category list for management
function populateCategoryList() {
  categoryList.innerHTML = "";
  Object.keys(todoData).forEach((categoryName) => {
    const listItem = document.createElement("li");

    const categoryNameSpan = document.createElement("span");
    categoryNameSpan.innerText = categoryName;

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", () => {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = categoryName;

      const saveButton = document.createElement("button");
      saveButton.innerText = "Save";
      saveButton.addEventListener("click", () => {
        const updatedCategoryName = editInput.value.trim();
        if (updatedCategoryName && updatedCategoryName !== categoryName) {
          todoData[updatedCategoryName] = todoData[categoryName];
          delete todoData[categoryName];
          populateCategoryDropdown();
          populateCategoryList();
          renderTodos();
        }
      });
      // Update elements
      listItem.replaceChild(editInput, categoryNameSpan);
      listItem.replaceChild(saveButton, editButton);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      // Clear todos associated with the category
      delete todoData[categoryName];
      populateCategoryDropdown();
      populateCategoryList();
      renderTodos();
    });

    listItem.appendChild(categoryNameSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    categoryList.appendChild(listItem);
  });
}

// Render todos
function renderTodos() {
  todosList.innerHTML = "";
  Object.keys(todoData).forEach((categoryName) => {
    const categoryHeader = document.createElement("h3");
    categoryHeader.innerText = categoryName;
    todosList.appendChild(categoryHeader);

    const categoryTodos = todoData[categoryName];
    categoryTodos.forEach((todo, index) => {
      const newListItem = document.createElement("li");
      newListItem.className = "todo-item";

      // Checkbox to mark todos complete
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.todoComplete;
      checkbox.className = "todo-checkbox";
      checkbox.addEventListener("change", () => {
        todo.todoComplete = checkbox.checked;
        renderTodos();
      });

      // Todo text
      const todoText = document.createElement("span");
      todoText.innerText = todo.todoText;
      todoText.className = "todo-text";
      if (todo.todoComplete) {
        todoText.classList.add("completed");
      }

      // Edit todo
      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.className = "todo-edit-btn";
      editButton.addEventListener("click", () => {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = todo.todoText;
        editInput.className = "edit-input";

        // Save todo
        const saveButton = document.createElement("button");
        saveButton.innerText = "Save";
        saveButton.className = "save-btn";

        // Replace elements
        newListItem.replaceChild(editInput, todoText);
        newListItem.replaceChild(saveButton, editButton);

        saveButton.addEventListener("click", () => {
          todo.todoText = editInput.value;
          renderTodos();
        });
      });

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.className = "todo-delete-btn";
      deleteButton.addEventListener("click", () => {
        categoryTodos.splice(index, 1);
        renderTodos();
      });

      newListItem.appendChild(checkbox);
      newListItem.appendChild(todoText);
      newListItem.appendChild(editButton);
      newListItem.appendChild(deleteButton);

      todosList.appendChild(newListItem);
    });
  });

  // Update pending tasks
  updatePendingTasksCount();
}

// Update pending tasks
function updatePendingTasksCount() {
  let pendingCount = 0;
  Object.values(todoData).forEach((todos) => {
    pendingCount += todos.filter((todo) => !todo.todoComplete).length;
  });
  taskCount.innerText = `You have ${pendingCount} pending task${
    pendingCount !== 1 ? "s" : ""
  }.`;
}

// Add New todo
function addTodo() {
  const newTodoText = inputField.value.trim();
  const selectedCategory = categorySelect.value;
  if (newTodoText !== "" && selectedCategory) {
    const newTodo = new Todo(
      todoData[selectedCategory].length,
      newTodoText,
      false
    );
    todoData[selectedCategory].push(newTodo);
    inputField.value = "";
    renderTodos();
  }
}

// Add New category
function addCategory() {
  const newCategoryName = newCategoryInput.value.trim();
  if (newCategoryName !== "" && !(newCategoryName in todoData)) {
    todoData[newCategoryName] = [];
    newCategoryInput.value = "";
    populateCategoryDropdown();
    populateCategoryList();
  }
}

// Clear completed todos
function clearCompletedTodos() {
  Object.keys(todoData).forEach((categoryName) => {
    const incompleteTodos = todoData[categoryName].filter(
      (todo) => !todo.todoComplete
    );
    todoData[categoryName] = incompleteTodos;
  });
  renderTodos();
}

// Add todos and clear todos
addButton.addEventListener("click", addTodo);
inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});
clearCompletedButton.addEventListener("click", clearCompletedTodos);

// Add category + enter key
addCategoryButton.addEventListener("click", addCategory);
newCategoryInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addCategory();
    }
});

// Initial population of categories and todos
populateCategoryDropdown();
populateCategoryList();
renderTodos();

console.log(todoData);