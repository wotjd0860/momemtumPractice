const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];

function handleCheckbox(event) {
    event.preventDefault();

    const TEXT_THROUGH = "text-decoration-line-through";
    const eventLabel = event.target.nextElementSibling;
    
    if (eventLabel.classList.contains(TEXT_THROUGH)) {
        eventLabel.classList.remove(TEXT_THROUGH);
    } else {
        eventLabel.classList.add(TEXT_THROUGH);
    }
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newToDo,
        id: Date.now()
    };
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    if (toDos.length === 0) {
        localStorage.removeItem("todos");
    } else {
        saveToDos();
    }
}

function paintTodo(newTodoObj) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.classList.add("d-flex");
    li.classList.add("align-items-center");
    li.classList.add("justify-content-between");
    li.id = newTodoObj.id;

    const div = document.createElement("div");
    div.classList.add("d-flex");
    div.classList.add("align-items-center");
    div.classList.add("me-4");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input");
    checkbox.classList.add("me-1");
    checkbox.id = `chbx-${newTodoObj.id}`;

    checkbox.addEventListener("change", handleCheckbox);

    const label = document.createElement("label");
    label.innerText = newTodoObj.text;
    label.classList.add("form-check-label");
    label.classList.add("text-break");
    label.setAttribute("for", checkbox.id);

    const i = document.createElement("i");
    i.classList.add("bi");
    i.classList.add("bi-trash-fill");
    i.classList.add("float-end");

    i.addEventListener("click", deleteToDo);

    div.appendChild(checkbox);
    div.appendChild(label);
    
    li.appendChild(div);
    li.appendChild(i);

    toDoList.appendChild(li);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintTodo);
}