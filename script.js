
function createTaskElement(taskText, isCompleted = false) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = taskText;

    li.appendChild(span);

    if (isCompleted) {
        li.classList.add("completed");

        let statusText = document.createElement("span");
        statusText.innerText = "Completed";
        statusText.classList.add("status");
        li.appendChild(statusText);
    }

    // complete toggle
    li.addEventListener("click", function () {
        li.classList.toggle("completed");

        let status = li.querySelector(".status");

        if (li.classList.contains("completed")) {
            if (!status) {
                let statusText = document.createElement("span");
                statusText.innerText = "Completed";
                statusText.classList.add("status");
                li.appendChild(statusText);
            }
        } else {
            if (status) {
                status.remove();
            }
        }

        saveData();
    });

    // delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function () {
        li.remove();
        saveData();
    };

    li.appendChild(deleteBtn);

    return li;
}


function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") {
        alert("Enter a task");
        return;
    }

    let li = createTaskElement(task);

    document.getElementById("taskList").appendChild(li);

    input.value = "";

    saveData();
}


// 💾 Save
function saveData() {
    let tasks = [];
    let items = document.querySelectorAll("#taskList li");

    items.forEach(li => {
        let text = li.querySelector("span").innerText;
        let completed = li.classList.contains("completed");

        tasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// 🔄 Load
function loadData() {
    let data = localStorage.getItem("tasks");

    if (data) {
        let tasks = JSON.parse(data);

        tasks.forEach(task => {
            let li = createTaskElement(task.text, task.completed);
            document.getElementById("taskList").appendChild(li);
        });
    }
}

loadData();