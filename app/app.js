const hours = document.querySelector('.hours')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')
const day = document.querySelector('.day')
const month = document.querySelector('.month')
const year = document.querySelector('.year')

function getTime() {
    const date = new Date();

    const hr = updateTime(date.getHours());
    const min = updateTime(date.getMinutes());
    const sec = updateTime(date.getSeconds());

    hours.innerHTML = `${hr} :`;
    minutes.innerHTML = `${min} :`;
    seconds.innerHTML = sec;

    setTimeout(() => {
        getTime()
    }, 1000)
}

function updateTime(t) {
    if (t < 10) {
        return '0' + t
    } else {
        return t
    }
}

function getDate() {
    const date = new Date();

    const dy = updateTime(date.getDate());
    const mth = updateTime(date.getMonth() + 1);
    const yr = date.getFullYear();

    day.innerHTML = dy;
    month.innerHTML = mth;
    year.innerHTML = yr;
}

getDate();
getTime();






