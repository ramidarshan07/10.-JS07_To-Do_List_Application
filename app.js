const taskInput = document.querySelector("#taskinput");
const priority = document.querySelector("#priority");
const tasklist = document.querySelector(".task-list");

document.addEventListener("DOMContentLoaded", loadTask);

function addTask() {
    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("list-group-item");

    li.innerHTML = `
    <span class="${priority.value}">${taskInput.value}</span>
    <div>
        <input type="checkbox">
        <i class="bi bi-pencil-square" onclick="editTask(this)"></i>
        <i class="bi bi-trash3" onclick="deleteTask(this)"></i>
    </div>`;

    tasklist.append(li);
    saveTask();
    clearInput();
}

function deleteTask(ele) {
    ele.parentElement.parentElement.remove();
    saveTask();
}

function editTask(ele) {
    const taskSpan = ele.parentElement.previousElementSibling;
    const newTask = prompt("Edit your task:", taskSpan.innerText);
    if (newTask !== null && newTask.trim() !== "") {
        taskSpan.innerText = newTask.trim();
        saveTask();
    }
}

function saveTask() {
    localStorage.setItem("tasks", document.querySelector(".task-list").innerHTML);
}

function loadTask() {
    let savedTask = localStorage.getItem("tasks");
    if (savedTask) {
        document.querySelector(".task-list").innerHTML = savedTask;
    }
}

function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        tasklist.innerHTML = "";
        saveTask();
    }
}

function clearInput() {
    taskInput.value = "";
    priority.value = "Select priority";
}
