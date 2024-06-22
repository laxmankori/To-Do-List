let todoInput = document.getElementById("todo-input");
let todoList = document.getElementById("todoList");
let addTodo = document.getElementById("add_todo");
let btn_txt = addTodo.innerText;
let todoItems = [];
let edit_id = null;

let objstr = localStorage.getItem("value");

if (objstr != null) {
  todoItems = JSON.parse(objstr);
}

displayItem();

addTodo.onclick = () => {
    const value = todoInput.value;
    if (edit_id != null) {
        // edit 
        todoItems.splice(edit_id,1,{item : value});
        edit_id = null;
    }else{
        
        if (value == "") {
            alert("Please Enter Text");
        }else{
            
            todoItems.push({ item: value });
            
        }
    }
    saveItem(todoItems);
      displayItem();
      todoInput.value = "";
    addTodo.innerText = btn_txt;
};

function saveItem(todoItems) {
  localStorage.setItem("value", JSON.stringify(todoItems));
}

function displayItem() {
  let statement = "";

  todoItems.forEach((user,i) => {

    statement += `<li>
    <span>${i+1}</span>
      <span>${user.item}</span>
      <div class="todo-buttons">
        <button><i class="fa-solid fa-pen-to-square" onclick="editItem(${i})"></i></button>
        <button><i class="fa-solid fa-trash" onclick="deletItem(${i})"></i></button>
      </div>
    </li>`;
  });

  todoList.innerHTML = statement;
}

function editItem(id) {
    edit_id = id;
    todoInput.value = todoItems[id].item;
    addTodo.innerText = "Save";
}

function deletItem(id) {
    todoItems.splice(id,1);
    saveItem(todoItems);
    displayItem();
}

