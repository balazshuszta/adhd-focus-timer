# ADHD Focus Timer

A minimal distraction-free timer app designed to help users with ADHD stay focused using a Pomodoro-like system, enhanced with brown noise and dynamic breaks.

---

## 🎯 Purpose

This app helps improve focus during study sessions by combining structured time intervals and environmental audio cues. It's built using F# and WebSharper as a single-page application (SPA).

## 🔧 Features

- 25-minute study session with looping brown noise
- 5-minute break with soft chime, increasing +5 minutes each round
- Visual timer, start/pause/reset buttons
- Automatic session switching (Study ⬌ Break)
- Fully browser-based (no server dependency)

---

## ▶️ Try Live

🔗 **[Live Demo](https://<your-username>.github.io/adhd-focus-timer/)** (replace after publishing)

## 🖼️ Screenshots

> 📸 _Include screenshots after you first deploy the app_

---

## 🚀 Run Instructions

1. Install WebSharper templates (if needed):
    ```bash
    dotnet new -i WebSharper.Templates
    ```

2. Create and enter your project:
    ```bash
    dotnet new ws-spa -n AdhdFocusTimer
    cd AdhdFocusTimer
    ```

3. Replace the content of `AdhdFocusTimer.Client/Client.fs` with the code from `Adhd Focus Timer` in this repo.

4. Run the app:
    ```bash
    dotnet run
    ```

5. Open your browser at: `http://localhost:5000`

---

## 🛠️ Deployment (GitHub Pages)

1. Create `gh-pages.yml` in `.github/workflows/` with WebSharper deploy script (see IntelliLogo example).
2. Enable GitHub Pages on the `gh-pages` branch.
3. Commit and push to GitHub.

---

## 🧠 Author

Created by Balázs Huszta for the DUE F# programming course.

---

## 📜 License

MIT License (or specify if required)
