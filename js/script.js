const todoInput = document.getElementById("todo-input");
const dueDateInput = document.getElementById("due-date");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const filterBtn = document.getElementById("filter-btn");

let filterStatus = "all"; // all, pending, completed

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
  statusBtn.classList.add("status-btn");
  statusBtn.onclick = () => {
    statusBtn.textContent =
      statusBtn.textContent === "Pending" ? "Completed" : "Pending";
    toggleFilter(); // reapply filter
  };
  tdStatus.appendChild(statusBtn);

  const tdActions = document.createElement("td");
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => removeTask(tr);
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
}

function removeTask(rowElement) {
  rowElement.remove();
  if (todoList.children.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
  }
}

function toggleFilter() {
  const rows = todoList.querySelectorAll("tr");
  if (rows.length === 0 || rows[0].classList.contains("no-task")) return;

  filterStatus =
    filterStatus === "all"
      ? "pending"
      : filterStatus === "pending"
      ? "completed"
      : "all";

  filterBtn.textContent = `FILTER (${filterStatus.toUpperCase()})`;

  rows.forEach((row) => {
    const statusText = row.querySelector(".status-btn")?.textContent || "";
    if (
      filterStatus === "all" ||
      (filterStatus === "pending" && statusText === "Pending") ||
      (filterStatus === "completed" && statusText === "Completed")
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Event listeners
addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
});
filterBtn.addEventListener("click", toggleFilter);
