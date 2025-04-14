export const addpj = () => {
let todos = JSON.parse(localStorage.getItem('todos')) || [];
const todoinput = document.getElementById('projectinput');
const todolist = document.getElementById('todoliste');
const todocount = document.getElementById('todocount');
const deletebutton = document.getElementById('deletebtn');
const addbutton = document.getElementById('addprojects');
////////////////
//items as in taskes/taskes

const modal = document.querySelector("#myModal");
const closer = document.querySelector(".close");

let alltasks = JSON.parse(localStorage.getItem('alltasks')) || [];
const tasklist = document.getElementById('todoliste');
const taskname = document.getElementById("name");
const taskdate = document.getElementById("date");
const taskpriority = document.getElementById("priority");
const tasksubmit = document.getElementById("tasksubmit");



document.addEventListener("DOMContentLoaded", function() {
    addbutton.addEventListener('click', addTask);
    todoinput.addEventListener('keydown', function(event){
      if(event.key === 'Enter'){
        event.preventDefault();
        addTask();
      }
    });
    deletebutton.addEventListener('click', deleteAllTasks);
    displayTasks();
});

function addTask() {
   const newproject = todoinput.value.trim();
   if(newproject !== '') {
       todos.push({text: newproject, disabled: false,});
       saveToLocalStorage();
       todoinput.value = '';
       displayTasks();       
   }
}

function displayTasks() {
  todolist.innerHTML = "";
  todos.forEach((itema, index) => {
    const lis =  document.createElement('li');
    lis.innerHTML = `<div class="todo-container">
    <input type="checkbox" class="todo-checkbox" id="input-${index}" ${itema.disabled ? "checked" : ""}>
    <button class="open tasks" id="taskes-${index}">tasks</button>
    <p id="todos-${index}" class="${itema.disabled ? "disabled" : ""}"  >${itema.text}
    </p>
    </div>`;
    lis.querySelector(`#todos-${index}`).addEventListener("click", () => editProject(index));

    lis.querySelector(`#taskes-${index}`).addEventListener("click", function() {
      
      modal.style.display = "block";
    });

    lis.querySelector('.todo-checkbox').addEventListener("change", () => toggleTask(index));
    todolist.appendChild(lis);
  });
  todocount.textContent = todos.length;   
}


function editProject(index) {
  const todoitema = document.getElementById(`todos-${index}`);
  const existingText = todos[index].text;
  const inputelement = document.createElement('input');

  inputelement.value = existingText;
  todoitema.replaceWith(inputelement);
  inputelement.focus();
  
  inputelement.addEventListener("blur", function () {
    const updatedText = inputelement.value.trim();
    if(updatedText){
      todos[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index){
  todos[index].disabled = !todos[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todos = [];
  alltasks = [];
  saveToLocalStoragess();
  saveToLocalStorage();
  showeTasks();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/////////////////////////////////////////////////////////////////////////////
////projecs in taskes

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}) 
closer.addEventListener('click', function() {
  modal.style.display = "none";
}) 


document.addEventListener("DOMContentLoaded", function() {
  tasksubmit.addEventListener('click', taskes);
  tasksubmit.addEventListener('keydown', function(eventa){
    if(eventa.key === 'Enter'){
      eventa.preventDefault();
      taskes();
    }
  });
  deletebutton.addEventListener('click', deleteAllTasks);
  showeTasks();
});


function taskes(){
  const newtask = taskname.value.trim();
  const dateline = taskdate.value.trim();
  const priority = taskpriority.value.trim();
   if(newtask !== '' && dateline !== '' && priority !== '') {
       alltasks.push({text: newtask, disabled: false,},{textb: dateline, disabled: false,},{textc: priority, disabled: false,});
       saveToLocalStoragess();
       newtask.value = '';
       dateline.value = '';
       priority.value = '';
       showeTasks();       
   }
  
}

function showeTasks() {
  tasklist.innerHTML = "";
  alltasks.forEach((itemo, indexo) => {
    const tas =  document.createElement('li');
    tas.innerHTML = `<div class="todo-container">
    <input type="checkbox" class="todo-checkbox" id="input-${indexo}" ${itemo.disabled ? "checked" : ""}>
   
    <p id="taskas-${indexo}" class="${itemo.disabled ? "disabled" : ""}"  >${itemo.text}</p>
    <p id="taskas-${indexo}-b" class="${itemo.disabled ? "disabled" : ""}"  >${itemo.textb}</p>
    <p id="taskas-${indexo}-c" class="${itemo.disabled ? "disabled" : ""}"  >${itemo.textc}</p>

    </div>`;
    tas.querySelector(`#taskas-${indexo}`).addEventListener("click", () => editProject(indexo));

    tas.querySelector('.todo-checkbox').addEventListener("change", () => toggleTask(indexo));
    todolist.appendChild(tas);
  });
  todocount.textContent = todos.length;   
}

function saveToLocalStoragess() {
  localStorage.setItem("alltasks", JSON.stringify(alltasks));
}

}
