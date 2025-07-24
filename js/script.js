const todoInput = document.getElementById("todo-input");
const dueDateInput = document.getElementById("due-date");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const filterBtn = document.getElementById("filter-btn");

let filterStatus = "all"; // all | pending | completed

function addTask() {
  const taskText = todoInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!taskText || !dueDate) return;

  const tr = document.createElement("tr");

  const tdTask = document.createElement("td");
  tdTask.textContent = taskText;

  const tdDate = document.createElement("td");
  tdDate.textContent = dueDate;

  const tdStatus = document.createElement("td");
  const statusBtn = document.createElement("button");
  statusBtn.textContent = "Pending";
  statusBtn.className = "status-btn";
  tdStatus.appendChild(statusBtn);

  const tdActions = document.createElement("td");

  // Complete Button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.onclick = () => {
    if (statusBtn.textContent === "Pending") {
      statusBtn.textContent = "Completed";
      statusBtn.classList.add("completed");
    } else {
      statusBtn.textContent = "Pending";
      statusBtn.classList.remove("completed");
    }
    applyFilter();
  };

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    const newTask = prompt("Edit task:", tdTask.textContent);
    const newDate = prompt("Edit due date (YYYY-MM-DD):", tdDate.textContent);
    if (newTask !== null && newTask.trim() !== "") tdTask.textContent = newTask.trim();
    if (newDate !== null && newDate !== "") tdDate.textContent = newDate;
  };

  // Delete Button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => removeTask(tr);

  tdActions.appendChild(completeBtn);
  tdActions.appendChild(editBtn);
  tdActions.appendChild(delBtn);

  tr.appendChild(tdTask);
  tr.appendChild(tdDate);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  if (todoList.querySelector(".no-task")) {
    todoList.innerHTML = "";
  }

  todoList.appendChild(tr);

  todoInput.value = "";
  dueDateInput.value = "";

  applyFilter();
}

function removeTask(rowElement) {
  rowElement.remove();
  if (todoList.children.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
  }
}

function toggleFilter() {
  filterStatus =
    filterStatus === "all"
      ? "pending"
      : filterStatus === "pending"
      ? "completed"
      : "all";

  filterBtn.textContent = `FILTER (${filterStatus.toUpperCase()})`;
  applyFilter();
}

function applyFilter() {
  const rows = todoList.querySelectorAll("tr");
  let visibleCount = 0;

  rows.forEach((row) => {
    const status = row.querySelector(".status-btn")?.textContent.toLowerCase();
    if (!status) return;

    const match =
      filterStatus === "all" ||
      (filterStatus === "pending" && status === "pending") ||
      (filterStatus === "completed" && status === "completed");

    row.style.display = match ? "" : "none";
    if (match) visibleCount++;
  });

  if (visibleCount === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
  }
}

// Event listeners
addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
});
filterBtn.addEventListener("click", toggleFilter);
