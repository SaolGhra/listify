document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.textContent = taskText;
            taskList.appendChild(li);
            taskInput.value = "";
        }
    }

    // Event listener for the "Add Task" button
    addTaskBtn.addEventListener("click", addTask);

    // Event listener for pressing Enter in the input field
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
