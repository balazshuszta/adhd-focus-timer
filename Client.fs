// ADHD Focus Timer - WebSharper SPA using F#

namespace AdhdFocusTimer

open WebSharper
open WebSharper.UI
open WebSharper.UI.Html
open WebSharper.UI.Client

[<JavaScript>]
module Client =

    open WebSharper.JavaScript

    // Timer state
    type Phase = | Study | Break

    type Model = {
        CurrentPhase : Phase
        TimeLeft : int // in seconds
        BreakLength : int // current break duration in seconds
        Round : int
        Running : bool
    }

    let initialModel = {
        CurrentPhase = Study
        TimeLeft = 25 * 60
        BreakLength = 5 * 60
        Round = 1
        Running = false
    }

    let mutable timerInterval : JS.Timeout option = None
    let brownNoise = JS.Audio("https://cdn.pixabay.com/audio/2022/03/22/audio_37b4ad69f1.mp3")
    brownNoise.loop <- true

    let chime = JS.Audio("https://cdn.pixabay.com/audio/2021/08/04/audio_71a8aeef67.mp3")

    let formatTime (seconds: int) : string =
        let mins = seconds / 60
        let secs = seconds % 60
        sprintf "%02d:%02d" mins secs

    let updateModel (modelVar: Var<Model>) =
        match timerInterval with
        | Some t -> JS.ClearInterval t; timerInterval <- None
        | None -> ()

        let interval = JS.SetInterval (fun () ->
            let model = modelVar.Value
            if model.Running then
                if model.TimeLeft > 0 then
                    modelVar.Value <- { model with TimeLeft = model.TimeLeft - 1 }
                else
                    let nextPhase =
                        match model.CurrentPhase with
                        | Study -> Break
                        | Break -> Study

                    let nextBreak =
                        if model.CurrentPhase = Study then model.BreakLength + (5 * 60) else model.BreakLength

                    if nextPhase = Break then chime.play()
                    if nextPhase = Study then brownNoise.play() else brownNoise.pause()

                    modelVar.Value <- {
                        CurrentPhase = nextPhase
                        TimeLeft = if nextPhase = Study then 25 * 60 else nextBreak
                        BreakLength = nextBreak
                        Round = model.Round + (if nextPhase = Break then 1 else 0)
                        Running = true
                    }
        ) 1000

        timerInterval <- Some interval

    let timerView (modelVar: Var<Model>) =
        div [ attr.className "timer-container" ] [
            h2 [] [ text (match modelVar.Value.CurrentPhase with Study -> "Focus Time" | Break -> "Break Time") ]
            h1 [] [ text (formatTime modelVar.Value.TimeLeft) ]
            div [ attr.className "controls" ] [
                button [ on.click (fun _ _ ->
                    let m = modelVar.Value
                    if not m.Running then
                        modelVar.Value <- { m with Running = true }
                        updateModel modelVar
                        if m.CurrentPhase = Study then brownNoise.play()
                    else
                        modelVar.Value <- { m with Running = false }
                        brownNoise.pause()
                ) ] [ text (if modelVar.Value.Running then "Pause" else "Start") ]

                button [ on.click (fun _ _ ->
                    brownNoise.pause()
                    let m = initialModel
                    modelVar.Value <- m
                    if timerInterval.IsSome then
                        JS.ClearInterval timerInterval.Value
                        timerInterval <- None
                ) ] [ text "Reset" ]
            ]
            div [] [ text (sprintf "Round: %d" modelVar.Value.Round) ]
        ]

    [<SPAEntryPoint>]
    let Main () =
        let modelVar = Var.Create initialModel
        div [] [ timerView modelVar ] |> Doc.RunById "main"
