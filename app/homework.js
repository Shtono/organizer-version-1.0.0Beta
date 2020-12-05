// const uiIitle = document.querySelector('.task-title h3');
// const uiDesc = document.querySelector('.task-title p');
const title = document.querySelector('.task-input');
const description = document.querySelector('.description-input');
const addBtn = document.querySelector('.add-btn');
const ul = document.querySelector('.task-list');
const ulChecked = document.querySelector('.task-list-checked');


addBtn.addEventListener('click', addTask);
ul.addEventListener('click', deleteItem);
ulChecked.addEventListener('click', deleteItemChecked);
ul.addEventListener('click', showInfo)
ulChecked.addEventListener('click', showInfo)
ul.addEventListener('click', hideInfo)
ulChecked.addEventListener('click', hideInfo)
ul.addEventListener('click', addTaskChecked)
ulChecked.addEventListener('click', returnTask)

function Task(title, body) {
    this.title = title;
    this.body = body;
}

function addTask() {
    if (title.value !== '') {
        let task = new Task(title.value, description.value);
        addToLocalStorage(task);
        printTasksOnScreen();
        title.value = '';
        description.value = '';
    }
}
function addTaskChecked(e) {
    if (e.target.classList.contains('fa-check')) {
        let title = e.target.parentElement.previousElementSibling.firstElementChild.textContent;
        let body = e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.textContent;
        let task = new Task(title, body);
        addToLocalStorageChecked(task);
        removeFromLocalStorage(task);
        e.target.parentElement.parentElement.remove();
        printTasksOnScreen();
        printTasksOnScreenChecked();
    }
    e.preventDefault();
}

function returnTask(e) {
    if (e.target.classList.contains('fa-arrow-left')) {
        let title = e.target.parentElement.previousElementSibling.firstElementChild.textContent;
        let body = e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.textContent;
        let task = new Task(title, body);
        addToLocalStorage(task);
        removeFromLocalStorageChecked(task);
        e.target.parentElement.parentElement.remove();
        printTasksOnScreen();
        printTasksOnScreenChecked();
    }
    e.preventDefault();
}

function showInfo(e) {
    if (e.target.classList.contains('click')) {
        let body = e.target.nextElementSibling;
        let hideBtn = e.target.nextElementSibling.nextElementSibling;
        if (body.style.display = 'none') {
            body.style.display = 'block';
            hideBtn.style.display = 'block';
        }
    }
}
function hideInfo(e) {
    if (e.target.classList.contains('hide-btn')) {
        let body = e.target.previousElementSibling;
        let hideBtn = e.target;
        body.style.display = 'none';
        hideBtn.style.display = 'none';
    }
}

function deleteItem(e) {
    if (e.target.classList.contains('fa-times-circle')) {
        if (confirm('Delete item task ?')) {
            let title = e.target.parentElement.previousElementSibling.firstElementChild.textContent;
            let body = e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.textContent;
            let task = new Task(title, body);
            e.target.parentElement.parentElement.remove();
            removeFromLocalStorage(task);
            printTasksOnScreen();
        }
    }
    e.preventDefault;
}
function deleteItemChecked(e) {
    if (e.target.classList.contains('fa-times-circle')) {
        let title = e.target.parentElement.previousElementSibling.firstElementChild.textContent;
        let body = e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.textContent;
        let task = new Task(title, body);
        e.target.parentElement.parentElement.remove();
        removeFromLocalStorageChecked(task);
        printTasksOnScreenChecked();
    }
    e.preventDefault;
}

function addToLocalStorage(taskObject) {
    let tasks;
    if (localStorage.getItem('tasksHome') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasksHome'))
    } else {
        tasks = [];
    }
    tasks.push(taskObject);
    localStorage.setItem('tasksHome', JSON.stringify(tasks));
}
function addToLocalStorageChecked(taskObject) {
    let tasks;
    if (localStorage.getItem('tasksHomeChecked') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasksHomeChecked'))
    } else {
        tasks = [];
    }
    tasks.push(taskObject);
    localStorage.setItem('tasksHomeChecked', JSON.stringify(tasks));
}

function removeFromLocalStorage(taskObject) {
    let tasks = JSON.parse(localStorage.getItem('tasksHome'));

    tasks.forEach((task, index) => {
        if (task.title === taskObject.title && task.body === taskObject.body) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasksHome', JSON.stringify(tasks));
}
function removeFromLocalStorageChecked(taskObject) {
    let tasks = JSON.parse(localStorage.getItem('tasksHomeChecked'));

    tasks.forEach((task, index) => {
        if (task.title === taskObject.title && task.body === taskObject.body) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasksHomeChecked', JSON.stringify(tasks));
}

function printTasksOnScreen() {
    if (localStorage.getItem('tasksHome') !== null) {
        let html = '';
        let tasks = JSON.parse(localStorage.getItem('tasksHome'));

        tasks.forEach(task => {
            html += `
            <li class="task-item">
                    <div class="task-title">
                        <h3 class="click">${task.title}</h3>
                        <p>${task.body}</p>
                        <button class="hide-btn">Hide</button>
                    </div>
                    <div class="task-actions">
                        <i class="fas fa-check"></i>
                        <i class="fas fa-times-circle"></i>
                    </div>
                </li>
            `
            ul.innerHTML = html;
        });
    }

}
function printTasksOnScreenChecked() {
    if (localStorage.getItem('tasksHomeChecked') !== null) {
        let html = '';
        let tasks = JSON.parse(localStorage.getItem('tasksHomeChecked'));

        tasks.forEach(task => {
            html += `
        <li class="task-item">
                <div class="task-title">
                    <h3 class="click">${task.title}</h3>
                    <p>${task.body}</p>
                    <button class="hide-btn">Hide</button>
                </div>
                <div class="task-actions">
                    <i class="fas fa-arrow-left"></i>
                    <i class="fas fa-times-circle"></i>
                </div>
            </li>
        `
            ulChecked.innerHTML = html;
        });
    }

}

printTasksOnScreen();
printTasksOnScreenChecked();

