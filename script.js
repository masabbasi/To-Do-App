const inputToDo = document.querySelector (".input-todo")
const addToDoButton = document.querySelector (".add-todo-button")
const toDoList = document.querySelector (".todo-list")
const filterOptionToDo = document.querySelector (".filter-todo")

addToDoButton.addEventListener("click",addToDo);
toDoList.addEventListener("click",deleteCompleteTodo)
filterOptionToDo.addEventListener("click",filterToDo)
document.addEventListener("DOMContentLoaded",getToDo)

function addToDo (event) {
    event.preventDefault()
    const createDiv = document.createElement("div");
    createDiv.classList.add("todo-item");
    const createLi = document.createElement("li")
    createLi.innerText=inputToDo.value;
    saveItemToLocal(inputToDo.value);
    inputToDo.value="";
    createDiv.appendChild(createLi)
    const createCompletedButton = document.createElement("button");
    createCompletedButton.classList.add("complete-btn");
    createCompletedButton.innerHTML=`<i class="fas fa-check"></i>`;
    createDiv.appendChild(createCompletedButton)
    const createTrashButton = document.createElement("button");
    createTrashButton.classList.add("trash-btn");
    createTrashButton.innerHTML=`<i class="fas fa-trash"></i>`;
    createDiv.appendChild(createTrashButton);
    toDoList.appendChild(createDiv)
}

function saveItemToLocal (toDoText) {
    let toDos;
    if (localStorage.getItem("todos")===null) {
        toDos=[];
    } else {
        toDos = JSON.parse(localStorage.getItem("todos"))
    }
    toDos.push(toDoText)
    localStorage.setItem("todos",JSON.stringify(toDos))
}

function deleteCompleteTodo (event) {
    const item = event.target.classList[0];
    if (item==="trash-btn") {
        removeItemFromLocal(event.target.parentElement);
        event.target.parentElement.remove();
    }
    if (item==="complete-btn") {
        event.target.parentElement.classList.toggle("completed")
    }
}

function removeItemFromLocal (toDoItem) {
    let toDos;
    if (localStorage.getItem("todos")===null) {
        toDos=[];
    } else {
        toDos = JSON.parse(localStorage.getItem("todos"))
    }
    const toDoItemText = toDoItem.children[0].innerText;
    toDos.splice(toDos.indexOf(toDoItemText),1)
    localStorage.setItem("todos",JSON.stringify(toDos))
}

function getToDo () {
    let toDos;
    if (localStorage.getItem("todos")===null) {
        toDos=[];
    } else {
        toDos = JSON.parse(localStorage.getItem("todos"))
    }
    toDos.forEach(function(todo){
        const createDiv = document.createElement("div");
        createDiv.classList.add("todo-item");
        const createLi = document.createElement("li")
        createLi.innerText=todo;
        createDiv.appendChild(createLi)
        const createCompletedButton = document.createElement("button");
        createCompletedButton.classList.add("complete-btn");
        createCompletedButton.innerHTML=`<i class="fas fa-check"></i>`;
        createDiv.appendChild(createCompletedButton)
        const createTrashButton = document.createElement("button");
        createTrashButton.classList.add("trash-btn");
        createTrashButton.innerHTML=`<i class="fas fa-trash"></i>`;
        createDiv.appendChild(createTrashButton);
        toDoList.appendChild(createDiv)
    }) 
}

function filterToDo (event) {
    const allToDo = toDoList.childNodes;
    allToDo.forEach(function(toDo){
        switch (event.target.value) {
            case "all": toDo.style.display="flex"; break;

            case "completed": if (toDo.classList.contains("completed")) {
                                toDo.style.display="flex";
                            } else {
                                toDo.style.display="none";
                            } break;

            case "uncompleted": if (toDo.classList.contains("completed")) {
                                    toDo.style.display="none";
                                } else {
                                    toDo.style.display="flex";
                                }  break;
        }
    })

}