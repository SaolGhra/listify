document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Function to add a new task
    function addTask(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = "";
        saveTasksToCookies();
    }

    // Function to save tasks to cookies
    function saveTasksToCookies() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(function(task) {
            tasks.push(task.textContent);
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
                    addTask(task);
                });
            }
        }
    }

    // Event listener for the "Add Task" button
    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
        }
    });

    // Event listener for pressing Enter in the input field
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText);
            }
        }
    });

    // Load tasks from cookies when the page is loaded
    loadTasksFromCookies();
});