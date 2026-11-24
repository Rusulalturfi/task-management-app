const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskCategoryInput = document.getElementById("task-category");
const taskDeadlineInput = document.getElementById("task-deadline");
const taskStatusInput = document.getElementById("task-status");
const taskList = document.getElementById("task-list");
const statusFilter = document.getElementById("status-filter");
const categoryFilter = document.getElementById("category-filter");

const savedTasks = localStorage.getItem("tasks");
let tasks = savedTasks ? JSON.parse(savedTasks) : [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getCurrentStatus(task) {
  if (task.status === "Completed") {
    return "Completed";
  }

  const today = new Date().toISOString().slice(0, 10);

  if (task.deadline < today) {
    return "Overdue";
  }

  return "In Progress";
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(function (task) {
    const currentStatus = getCurrentStatus(task);

    const matchesStatus =
      statusFilter.value === "All" ||
      statusFilter.value === currentStatus;

    const matchesCategory =
      categoryFilter.value === "All" ||
      categoryFilter.value === task.category;

    return matchesStatus && matchesCategory;
  });

  filteredTasks.forEach(function (task) {
    const listItem = document.createElement("li");
    const taskInfo = document.createElement("span");

    taskInfo.textContent =
      `${task.name} | ${task.category} | Deadline: ${task.deadline} | `;

    const statusSelect = document.createElement("select");
    statusSelect.classList.add("task-status-select");
    statusSelect.dataset.taskId = task.id;
    statusSelect.setAttribute("aria-label", `Status for ${task.name}`);

    const currentStatus = getCurrentStatus(task);

    if (currentStatus === "Overdue") {
      const overdueOption = document.createElement("option");
      overdueOption.value = "Overdue";
      overdueOption.textContent = "Overdue";
      overdueOption.disabled = true;
      statusSelect.appendChild(overdueOption);
    }

    ["In Progress", "Completed"].forEach(function (status) {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      statusSelect.appendChild(option);
    });

    statusSelect.value = currentStatus;

    listItem.append(taskInfo, statusSelect);
    taskList.appendChild(listItem);
  });
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const task = {
    id: Date.now(),
    name: taskNameInput.value.trim(),
    category: taskCategoryInput.value,
    deadline: taskDeadlineInput.value,
    status: taskStatusInput.value
  };

  if (task.name === "") {
    return;
  }

  tasks.push(task);
  saveTasks();
  renderTasks();
  taskForm.reset();
});

taskList.addEventListener("change", function (event) {
  if (!event.target.classList.contains("task-status-select")) {
    return;
  }

  const taskId = Number(event.target.dataset.taskId);
  const task = tasks.find(function (task) {
    return task.id === taskId;
  });

  if (task) {
    task.status = event.target.value;
    saveTasks();
    renderTasks();
  }
});

statusFilter.addEventListener("change", renderTasks);
categoryFilter.addEventListener("change", renderTasks);

renderTasks();