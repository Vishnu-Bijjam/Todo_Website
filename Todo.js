let unordered = document.getElementById("unorder");
let addButton = document.getElementById("addBtn");
let saveButton = document.getElementById("saveBtn");

function restore() {
    let stringifiedList = localStorage.getItem("todolist");
    let parsefiedList = JSON.parse(stringifiedList);
    if (parsefiedList === null) {
        return [];
    } else {
        return parsefiedList;
    }

}

let todoList = restore();

let todoCount = todoList.length;

function makeChanges(checkBoxId, labelId, todoId) {
    let inputElement = document.getElementById(checkBoxId);
    let labelElement = document.getElementById(labelId);
    console.log(labelElement);
    labelElement.classList.toggle('checked');

    let todoObjectIndex = todoList.findIndex(function(each) {
        let objectTodo = "todo" + each.uniqueNo;
        if (todoId === objectTodo) {
            return true;
        }
    });
    if (todoList[todoObjectIndex].ischecked === true) {
        todoList[todoObjectIndex].ischecked = false;
    } else {
        todoList[todoObjectIndex].ischecked = true;
    }
}

function makeDelete(todoId) {
    let newElement = document.getElementById(todoId);
    unordered.removeChild(newElement);
    let removed = todoList.findIndex(function(each) {
        let newtodoId = "todo" + each.uniqueNo;
        if (todoId === newtodoId) {
            return true;
        }
    })
    console.log(removed);
    todoList.splice(removed, 1);
    localStorage.setItem("todolist", JSON.stringify(todoList));
    console.log(localStorage.getItem("todoList"));


}

function createAndAppend(each) {
    let todoId = 'todo' + each.uniqueNo;
    let checkBoxId = "checkBox" + each.uniqueNo;
    let labelId = "label" + each.uniqueNo;

    let list = document.createElement("li");
    list.style.listStyleType = "none";
    list.classList.add("todo-item-container", "d-flex", "flex-row");
    list.id = todoId;
    unordered.appendChild(list);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkBoxId;
    inputElement.ischecked = each.ischecked;
    inputElement.onclick = function() {
        makeChanges(checkBoxId, labelId, todoId);
    }
    inputElement.classList.add("check-style");
    list.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.setAttribute("for", checkBoxId);
    labelContainer.classList.add("d-flex", "flex-row", "bg");
    list.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.textContent = each.text;
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    if (each.ischecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteElement = document.createElement("i");
    deleteElement.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteElement.onclick = function() {
        makeDelete(todoId);
    }
    deleteContainer.appendChild(deleteElement);

}

for (let each of todoList) {
    createAndAppend(each);
}

function addnew() {
    let inputValue = document.getElementById("inputText");

    if (inputValue.value === "") {
        alert("Enter Valid Text");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: inputValue.value,
        uniqueNo: todoCount,
        ischecked: false
    };
    todoList.push(newTodo);
    createAndAppend(newTodo);
    inputValue.value = "";
    console.log(todoList);
}

addButton.onclick = function() {
    addnew();
}

saveButton.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todoList));
}