export const addtsk = () => {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const todoinput = document.getElementById('projectinput');
  const todolist = document.getElementById('todoliste');
  const todocount = document.getElementById('todocount');
  const deletebutton = document.getElementById('deletebtn');
  const addbutton = document.getElementById('addprojects');
  
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
     const newtask = todoinput.value.trim();
     if(newtask !== '') {
         todos.push({text: newtask, disabled: false,});
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
      <p id="todos-${index}" class="${itema.disabled ? "disabled" : ""}" onclick='editTask(${index})' >${itema.text}
      </p>
      </div>`;
  
      lis.querySelector('.todo-checkbox').addEventListener("change", () => toggleTask(index));
      todolist.appendChild(lis);
    });
    todocount.textContent = todos.length;   
  }
  
  
  function editTask(index) {
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
    saveToLocalStorage();
    displayTasks();
  }
  
  
  
  
  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  
  }
  

  