const alarm = document.getElementById('alarm');

var timerState = false;
var workState = true;
var restState = false;

var workHour = 0;
var workMinute = 0;
var workSecond = 5;

var restHour = 0;
var restMinute = 0;
var restSecond = 3;

var hour = 0;
var minute = 0;
var second = 0;

var hourText = '';
var minuteText = '';
var secondText = '';

var timerText = document.getElementById('timer-time');

window.setInterval(timer, 1000);

setWork();

document.getElementById('timer-button').addEventListener('click', function() {
    if (document.getElementById('timer-display').style.display == 'none') {
        document.getElementById('timer-display').style.display = 'flex';
    } else {
        document.getElementById('timer-display').style.display = 'none';
    }
});

document.getElementById('timer-setting-button').addEventListener('click', function() {
    timerState = false;
    document.getElementById('timer-start').textContent = 'start';

    document.getElementById('timer-setting-window').style.display = 'flex';
    document.getElementById('timer-display').style.display = 'none';
});

document.getElementById('timer-setting-close').addEventListener('click', function() {
    workHour = document.getElementById('work-hour').value;
    workMinute = document.getElementById('work-minute').value;
    workSecond = document.getElementById('work-second').value;

    restHour = document.getElementById('rest-hour').value;
    restMinute = document.getElementById('rest-minute').value;
    restSecond = document.getElementById('rest-second').value;

    setWork();

    document.getElementById('timer-setting-window').style.display = 'none';
    document.getElementById('timer-display').style.display = 'flex';
});

function setWork() {
    hour = workHour;
    minute = workMinute;
    second = workSecond;
}

function setRest() {
    hour = restHour;
    minute = restMinute;
    second = restSecond;
}

function startWork() {
    setWork();
    workState = true;
    restState = false;
}

function startRest() {
    setRest();
    workState = false;
    restState = true;
}

function doTimer() {
    if (timerState == false) {
        timerState = true;
        document.getElementById('timer-start').textContent = 'stop';
    } else {
        timerState = false;
        document.getElementById('timer-start').textContent = 'start';
    }
}

function resetTimer() {
    timerState = false;
    workState = true;
    restState = false;
    document.getElementById('timer-start').textContent = 'start';
    setWork();
}

function timer() {
    if (timerState == true) {
        if (hour == 0 && minute == 0 && second == 0) {
            if (workState == true) {
                startRest();
            } else if (restState == true) {
                startWork();
            }
            alarm.play();
            return;
        } else if (second == 0) {
            if (minute == 0) {
                hour -= 1;
                minute = 59;
            } else {
                minute -= 1;
            }
            second = 59;
        } else {
            second -= 1;
        }
    }

    if (workState == true) {
        document.getElementById('timer-category').textContent = 'Work';
    } else if (restState == true) {
        document.getElementById('timer-category').textContent = 'Interval';
    }

    hourText = hour < 10 ? '0' + hour : hour;
    minuteText = minute < 10 ? '0' + minute : minute;
    secondText = second < 10 ? '0' + second : second;

    timerText.textContent = hourText + ':' + minuteText + ':' + secondText;
}

function checkNum() {
    if (document.getElementById('work-hour').value > 23) {
        document.getElementById('work-hour').value = 23;
    }
    if (document.getElementById('work-minute').value > 59) {
        document.getElementById('work-minute').value = 59;
    }
    if (document.getElementById('work-second').value > 59) {
        document.getElementById('work-second').value = 59;
    }

    if (document.getElementById('rest-hour').value > 23) {
        document.getElementById('rest-hour').value = 23;
    }
    if (document.getElementById('rest-minute').value > 59) {
        document.getElementById('rest-minute').value = 59;
    }
    if (document.getElementById('rest-second').value > 59) {
        document.getElementById('rest-second').value = 59;
    }

    if (document.getElementById('work-hour').value < 0) {
        document.getElementById('work-hour').value = 0;
    }
    if (document.getElementById('work-minute').value < 0) {
        document.getElementById('work-minute').value = 0;
    }
    if (document.getElementById('work-second').value < 0) {
        document.getElementById('work-second').value = 0;
    }

    if (document.getElementById('rest-hour').value < 0) {
        document.getElementById('rest-hour').value = 0;
    }
    if (document.getElementById('rest-minute').value < 0) {
        document.getElementById('rest-minute').value = 0;
    }
    if (document.getElementById('rest-second').value < 0) {
        document.getElementById('rest-second').value = 0;
    }
}