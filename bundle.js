// Simulated WebSharper-generated app
document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main");
    let time = 1500;
    let running = false;
    let interval;

    const format = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    const render = () => {
        main.innerHTML = `
            <h1>ADHD Focus Timer</h1>
            <h2>Focus Time</h2>
            <h1 id="timer">${format(time)}</h1>
            <div>
                <button id="start">${running ? "Pause" : "Start"}</button>
                <button id="reset">Reset</button>
            </div>
            <div>Round: 1</div>
        `;
        document.getElementById("start").onclick = () => {
            running = !running;
            if (running) {
                interval = setInterval(() => {
                    if (time > 0) {
                        time--;
                        document.getElementById("timer").textContent = format(time);
                    } else {
                        clearInterval(interval);
                        running = false;
                        new Audio("https://cdn.pixabay.com/audio/2021/08/04/audio_71a8aeef67.mp3").play();
                    }
                }, 1000);
                document.getElementById("start").textContent = "Pause";
            } else {
                clearInterval(interval);
                document.getElementById("start").textContent = "Start";
            }
        };
        document.getElementById("reset").onclick = () => {
            time = 1500;
            clearInterval(interval);
            running = false;
            render();
        };
    };
    render();
});