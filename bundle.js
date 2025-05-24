let timeLeft = 25 * 60;
let breakLength = 5 * 60;
let round = 1;
let phase = "Focus Time";
let running = false;
let interval;

function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (sec < 10 ? "0" : "") + sec;
}

function updateDisplay() {
    document.getElementById("timer").innerText = formatTime(timeLeft);
    document.getElementById("phase").innerText = phase;
    document.getElementById("round").innerText = "Round: " + round;
}

function tick() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        if (phase === "Focus Time") {
            phase = "Break Time";
            timeLeft = breakLength;
        } else {
            phase = "Focus Time";
            breakLength += 5 * 60;
            timeLeft = 25 * 60;
            round++;
        }
        updateDisplay();
        new Audio("https://cdn.pixabay.com/audio/2021/08/04/audio_71a8aeef67.mp3").play();
    }
}

function toggleTimer() {
    if (!running) {
        interval = setInterval(tick, 1000);
        running = true;
        new Audio("https://cdn.pixabay.com/audio/2022/03/22/audio_37b4ad69f1.mp3").play();
    } else {
        clearInterval(interval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(interval);
    timeLeft = 25 * 60;
    breakLength = 5 * 60;
    round = 1;
    phase = "Focus Time";
    running = false;
    updateDisplay();
}

window.onload = updateDisplay;