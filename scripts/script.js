document.addEventListener("DOMContentLoaded", function() {
    const taskTitleInput = document.getElementById("taskTitleInput");
    const taskDateInput = document.getElementById("taskDateInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const taskDetailsModal = document.getElementById("taskDetailsModal");
    const taskTitleModalInput = document.getElementById("taskTitleModalInput");
    const taskDescriptionModalInput = document.getElementById("taskDescriptionModalInput");
    const taskDateModalInput = document.getElementById("taskDateModalInput");
    const saveTaskDetailsBtn = document.getElementById("saveTaskDetailsBtn");
    const deleteTaskBtn = document.getElementById("deleteTaskBtn");
    let selectedTask = null;

    // Function to add a new task
    function addTask(taskTitle, taskDescription, taskDate) {
        // console.log("Adding task:", taskTitle, taskDescription, taskDate); // Debugging line
        const li = document.createElement("li");
        li.textContent = taskTitle;
        li.dataset.description = taskDescription || "";
        li.dataset.date = taskDate;
        taskList.appendChild(li);
        taskTitleInput.value = "";
        taskDateInput.value = "";
        saveTasksToCookies();
    }

    // Function to save tasks to cookies
    function saveTasksToCookies() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(function(task) {
            tasks.push({
                title: task.textContent,
                description: task.dataset.description || "",
                date: task.dataset.date
            });
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
                    addTask(task.title, task.description, task.date);
                });
            }
        }
    }

    // Event listener for the "Add Task" button
    addTaskBtn.addEventListener("click", function() {
        const taskTitle = taskTitleInput.value.trim();
        const taskDate = taskDateInput.value.trim();
        const taskDescription = "";
        if (taskTitle !== "") {
            addTask(taskTitle, taskDescription, taskDate);
        }
    });

    // Event listener for clicking a task
    taskList.addEventListener("click", function(event) {
        const clickedTask = event.target.closest("li");
        if (clickedTask) {
            selectedTask = clickedTask;
            taskTitleModalInput.value = selectedTask.textContent;
            taskDescriptionModalInput.value = selectedTask.dataset.description;
            taskDateModalInput.value = selectedTask.dataset.date;
            taskDetailsModal.style.display = "block";
        }
    });

    // Event listener for closing the task details modal
    taskDetailsModal.querySelector(".close").addEventListener("click", function() {
        taskDetailsModal.style.display = "none";
    });

    // Event listener for saving task details
    saveTaskDetailsBtn.addEventListener("click", function() {
        const newTaskTitle = taskTitleModalInput.value.trim();
        const newTaskDescription = taskDescriptionModalInput.value.trim();
        const newTaskDate = taskDateModalInput.value.trim();
        if (newTaskTitle !== "") {
            selectedTask.textContent = newTaskTitle;
            selectedTask.dataset.description = newTaskDescription;
            selectedTask.dataset.date = newTaskDate;
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
