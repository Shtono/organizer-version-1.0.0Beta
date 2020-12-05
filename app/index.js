function progNan(prog) {
    if (isNaN(prog)) {
        prog = 0
    } else {
        prog = prog;
    }
    return prog
}

// Shopping Bar
const barShopping = document.querySelector('.p-bar-shopping');
const progShopping = document.querySelector('.p-shopping p');

let pendingShopping = '';
let acomplishedShopping = '';
let progressShopping = '';

(function getProgressShopping() {
    if (localStorage.getItem('items') !== null && localStorage.getItem('itemsChecked') !== null) {
        const items = JSON.parse(localStorage.getItem('items'));
        const checked = JSON.parse(localStorage.getItem('itemsChecked'));
        pendingShopping = items.length;
        acomplishedShopping = checked.length;
        progressShopping = Math.round((acomplishedShopping) / (pendingShopping + acomplishedShopping) * 100)
    } else {
        progressShopping = 0;
    }
})();
barShopping.style.width = `${progressShopping}%`;
progShopping.innerHTML = `${progNan(progressShopping)}%`;


// Tasks Bar
const barTasks = document.querySelector('.p-bar-task-list');
const progTasks = document.querySelector('.p-task-list p');

let pendingTasks = '';
let acomplishedTasks = '';
let progressTasks = '';

(function getProgressTasks() {
    if (localStorage.getItem('tasks') !== null && localStorage.getItem('tasksChecked') !== null) {
        const items = JSON.parse(localStorage.getItem('tasks'));
        const checked = JSON.parse(localStorage.getItem('tasksChecked'));
        pendingTasks = items.length;
        acomplishedTasks = checked.length;
        progressTasks = Math.round((acomplishedTasks) / (pendingTasks + acomplishedTasks) * 100)
    } else {
        progressTasks = 0;
    }

})();
barTasks.style.width = `${progressTasks}%`;
progTasks.innerHTML = `${progNan(progressTasks)}%`;


// Home Work Bar
const barHome = document.querySelector('.p-bar-home-work');
const progHome = document.querySelector('.p-home-work p');

let pendingHome = '';
let acomplishedHome = '';
let progressHome = '';

(function getProgressHome() {
    if (localStorage.getItem('tasksHome') !== null && localStorage.getItem('tasksHomeChecked') !== null) {
        const items = JSON.parse(localStorage.getItem('tasksHome'));
        const checked = JSON.parse(localStorage.getItem('tasksHomeChecked'));
        pendingHome = items.length;
        acomplishedHome = checked.length;
        progressHome = Math.round((acomplishedHome) / (pendingHome + acomplishedHome) * 100)
    } else {
        progressHome = 0;
    }


})();
barHome.style.width = `${progressHome}%`;
progHome.innerHTML = `${progNan(progressHome)}%`;



