document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const taskDetailsModal = document.getElementById("taskDetailsModal");
    const taskDescriptionInput = document.getElementById("taskDescription");
    const taskDueDateInput = document.getElementById("taskDueDate");
    const saveTaskDetailsBtn = document.getElementById("saveTaskDetailsBtn");
    const deleteTaskBtn = document.getElementById("deleteTaskBtn");
    let selectedTask = null;

    // Function to add a new task
    function addTask(taskText, taskDueDate) {
        const li = document.createElement("li");
        li.innerHTML = `<span class="task-text">${taskText}</span>`;
        if (taskDueDate) {
            const dueDate = document.createElement("span");
            dueDate.textContent = formatDate(taskDueDate);
            li.appendChild(dueDate);
        }
        taskList.appendChild(li);
        taskInput.value = "";
        taskDate.value = "";
        saveTasksToCookies(); // Save tasks to cookies after adding a new task
    }

    // Function to format date as "YYYY-MM-DD"
    function formatDate(date) {
        const [year, month, day] = date.split("-");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    // Function to save tasks to cookies
    function saveTasksToCookies() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(function(task) {
            const taskText = task.querySelector(".task-text").textContent;
            const taskDueDate = task.querySelector("span:nth-child(2)") ? task.querySelector("span:nth-child(2)").textContent : null;
            tasks.push({text: taskText, dueDate: taskDueDate});
        });
        document.cookie = `tasks=${JSON.stringify(tasks)}`;
    }

    // Function to load tasks from cookies
    function loadTasksFromCookies() {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === "tasks") {
                const tasks = JSON.parse(value);
                tasks.forEach(function(task) {
                    addTask(task.text, task.dueDate);
                });
            }
        }
    }

    // Event listener for the "Add Task" button
    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        const taskDueDate = taskDate.value.trim();
        if (taskText !== "") {
            addTask(taskText, taskDueDate);
        }
    });

    // Event listener for pressing Enter in the input field
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim();
            const taskDueDate = taskDate.value.trim();
            if (taskText !== "") {
                addTask(taskText, taskDueDate);
            }
        }
    });

    // Event listener for clicking a task
    taskList.addEventListener("click", function(event) {
        const clickedTask = event.target.closest("li");
        if (clickedTask) {
            selectedTask = clickedTask;
            const taskText = selectedTask.querySelector(".task-text").textContent;
            const taskDueDate = selectedTask.querySelector("span:nth-child(2)") ? selectedTask.querySelector("span:nth-child(2)").textContent : "";
            taskDescriptionInput.value = taskText;
            taskDueDateInput.value = taskDueDate;
            taskDetailsModal.style.display = "block";
        }
    });

    // Event listener for closing the task details modal
    taskDetailsModal.querySelector(".close").addEventListener("click", function() {
        taskDetailsModal.style.display = "none";
    });

    // Event listener for saving task details
    saveTaskDetailsBtn.addEventListener("click", function() {
        const taskText = taskDescriptionInput.value.trim();
        const taskDueDate = taskDueDateInput.value.trim();
        if (taskText !== "") {
            selectedTask.querySelector(".task-text").textContent = taskText;
            if (taskDueDate !== "") {
                const dueDateSpan = selectedTask.querySelector("span:nth-child(2)");
                if (dueDateSpan) {
                    dueDateSpan.textContent = formatDate(taskDueDate);
                } else {
                    const newDueDate = document.createElement("span");
                    newDueDate.textContent = formatDate(taskDueDate);
                    selectedTask.appendChild(newDueDate);
                }
            } else {
                const dueDateSpan = selectedTask.querySelector("span:nth-child(2)");
                if (dueDateSpan) {
                    selectedTask.removeChild(dueDateSpan);
                }
            }
            saveTasksToCookies();
            taskDetailsModal.style.display = "none";
        }
    });

    // Event listener for deleting a task
    deleteTaskBtn.addEventListener("click", function() {
        taskList.removeChild(selectedTask);
        saveTasksToCookies();
        taskDetailsModal.style.display = "none";
    });

    // Load tasks from cookies when the page is loaded
    loadTasksFromCookies();
});