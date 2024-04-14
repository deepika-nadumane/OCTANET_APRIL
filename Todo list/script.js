document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addBtn").addEventListener("click", addTodo);
    loadTodos();
});

function addTodo() {
    var input = document.getElementById("todoInput").value;
    if (input.trim() !== '') {
        var li = document.createElement("li");
        li.innerHTML = `
            <span>${input}</span>
            <button class="delete-btn">Delete</button>
        `;
        document.getElementById("todoList").appendChild(li);
        fadeIn(li);
        saveTodo(input);
        document.getElementById("todoInput").value = '';
        addDeleteListener(li.querySelector(".delete-btn"));
    }
}

function fadeIn(element) {
    element.style.opacity = 0;
    var opacity = 0;
    var interval = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
    }, 50);
}

function saveTodo(todo) {
    var todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    var todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        li.innerHTML = `
            <span>${todo}</span>
            <button class="delete-btn">Delete</button>
        `;
        document.getElementById("todoList").appendChild(li);
        addDeleteListener(li.querySelector(".delete-btn"));
    });
}

function addDeleteListener(deleteBtn) {
    deleteBtn.addEventListener("click", function () {
        this.parentElement.remove();
        var todos = JSON.parse(localStorage.getItem("todos"));
        var todoText = this.previousElementSibling.textContent;
        todos = todos.filter(function (todo) {
            return todo !== todoText;
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    });
}