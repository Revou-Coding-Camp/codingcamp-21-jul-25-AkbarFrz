const todoInput = document.getElementById("todo-input");
const dueDateInput = document.getElementById("due-date");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const filterBtn = document.getElementById("filter-btn");

let filterStatus = "all"; // Filter: all, pending, completed

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
    applyFilter(); // Re-apply filter when status changes
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

  // Remove "No task found" if exists
  if (todoList.querySelector(".no-task")) {
    todoList.innerHTML = "";
  }

  todoList.appendChild(tr);

  todoInput.value = "";
  dueDateInput.value = "";

  applyFilter(); // Reapply filter after adding task
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
  rows.forEach((row) => {
    const statusBtn = row.querySelector(".status-btn");
    if (!statusBtn) return; // skip "no task found" row

    const status = statusBtn.textContent.toLowerCase();

    if (
      filterStatus === "all" ||
      (filterStatus === "pending" && status === "pending") ||
      (filterStatus === "completed" && status === "completed")
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  // Show 'No task found' if no visible tasks
  const visibleRows = [...todoList.querySelectorAll("tr")].filter(
    (row) => row.style.display !== "none"
  );

  if (visibleRows.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
  }
}

// Event listeners
addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
});
filterBtn.addEventListener("click", toggleFilter);
