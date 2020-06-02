// Define UI vars 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter-task');
const taskInput = document.querySelector('#input-task');

// Load All Event Listeners
loadEventListeners();

function loadEventListeners() {

    // Add Task
    form.addEventListener("submit", addTask);

    // Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear Tasks Event
    clearBtn.addEventListener('click', clearTasks);

    // DOM load Event
    document.addEventListener('DOMContentLoaded', getTasks);

}

// Add Task
function addTask(event) {
    if(taskInput.value === '') {
        alert('Add a Task..');
    }
    else{
        // Add Task
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // Add Class
        link.className = 'delete-item secondary-content';
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove" id="icon"></i>';
        // Append link to li
        li.appendChild(link);
        console.log(li);
        // Append li to ul
        taskList.appendChild(li);

        // Store in local storage
        storeTaskInLocalsStorage(taskInput.value);

        // Clear input
        taskInput.value = '';

        event.preventDefault(); 
    }
};

function storeTaskInLocalsStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
         // Add Task
         const li = document.createElement('li');
         // Add Class
         li.className = 'collection-item';
         // Create text node and append to li
         li.appendChild(document.createTextNode(task));
         // Create new link element
         const link = document.createElement('a');
         // Add Class
         link.className = 'delete-item secondary-content';
         // Add icon HTML
         link.innerHTML = '<i class="fa fa-remove" id="icon"></i>';
         // Append link to li
         li.appendChild(link);
         console.log(li);
         // Append li to ul
         taskList.appendChild(li);

    });
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from Local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            task.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    //taskList.innerHTML = '';

    // Faster 
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local storage
    clearTasksFromLocalStorage();
}

// Clear Tasks from Local storage

function clearTasksFromLocalStorage() {
    localStorage.clear();
}


// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}
