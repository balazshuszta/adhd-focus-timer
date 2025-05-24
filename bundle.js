document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main");
    let time = 1500;
    let running = false;
    let interval;
    let round = 1;
    let inBreak = false;

    const brownNoise = new Audio("https://cdn.pixabay.com/audio/2022/03/22/audio_37b4ad69f1.mp3");
    brownNoise.loop = true;

    const chime = new Audio("https://cdn.pixabay.com/audio/2021/08/04/audio_71a8aeef67.mp3");

    const format = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    const render = () => {
        const phaseText = inBreak ? "Break Time" : "Focus Time";
        main.innerHTML = `
            <h1>ADHD Focus Timer</h1>
            <h2>${phaseText}</h2>
            <h1 id="timer">${format(time)}</h1>
            <div>
                <button id="start">${running ? "Pause" : "Start"}</button>
                <button id="reset">Reset</button>
            </div>
            <div>Round: ${round}</div>
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
                        inBreak = !inBreak;
                        if (inBreak) {
                            time = 300 + ((round - 1) * 300); // növekvő szünetidő
                            chime.play();
                            brownNoise.pause();
                        } else {
                            time = 1500;
                            round++;
                            brownNoise.play();
                        }
                        render();
                        document.getElementById("start").textContent = "Pause";
                        running = true;
                        document.getElementById("start").click(); // újraindítjuk automatikusan
                    }
                }, 1000);
                if (!inBreak) brownNoise.play();
                document.getElementById("start").textContent = "Pause";
            } else {
                clearInterval(interval);
                brownNoise.pause();
                document.getElementById("start").textContent = "Start";
            }
        };

        document.getElementById("reset").onclick = () => {
            time = 1500;
            clearInterval(interval);
            running = false;
            inBreak = false;
            brownNoise.pause();
            render();
        };
    };

    render();
});