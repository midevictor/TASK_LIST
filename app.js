//declearing a variable for the FORM 
const form = document.querySelector('#task-form');
// declearing a variable for the UNORDERED LIST
const taskList = document.querySelector('.collection');
// declearing a variable for the FILTERTASK
const filter = document.querySelector('#Filter');
// declearing a variable for the task
const taskInput = document.querySelector('#task');
//declearing Variables for clear Task
const clearBtn = document.querySelector('.clear-tasks');

//LOAD ALL EVENTS LISTNERS
loadEventListeners();

//load all event listeners
function loadEventListeners() {

    //Load events
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //Remove Task Events
    taskList.addEventListener('click', removeTask);
    //Clear Task Events
    clearBtn.addEventListener('click', clearTasks);
    //Filter Task eVENTS
    filter.addEventListener('keyup', filterTask);

}
// Get Task form LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';

        //add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>'
            //apend the link to li
        li.appendChild(link);
        //append the li to ul
        taskList.appendChild(li);




    });


}

//create Add Task Function
function addTask(e) //taking an event object cos its an event handler//
{
    if (taskInput.value === '') {
        alert('input/add your task');
    }
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>'
        //apend the link to li
    li.appendChild(link);
    //append the li to ul
    taskList.appendChild(li);
    //Store in local storage
    storeTaskInLocalStorage(taskInput.value); //created a variable that calls the task values
    // Clear Input
    taskInput.value = '';
    e.preventDefault(); //prevents the default behaviour from happening//
}

//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure')) {
            e.target.parentElement.parentElement.remove();

            ///Remove Task from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);

        }


    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Task
function clearTasks() {

    //taskList.innerHTML = '';
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    //clear task from ls
    clearTasksFromLocalStorage();

}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}


//Filter Task
function filterTask(e) {
    const text = e.target.value.toLowerCase(); //this helps get the value 

    document.querySelectorAll('.collection-item').forEach(
        function(Task) {
            const item = Task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                Task.style.display = 'block';
            } else {
                Task.style.display = 'none';
            }

        }
    );

}