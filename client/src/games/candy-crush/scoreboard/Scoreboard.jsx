import "./scoreboard.scss"

export default function Scoreboard({score}) {
    return(
        <div className="scoreboard">
            <h2>{score}</h2>
        </div>
    )
}