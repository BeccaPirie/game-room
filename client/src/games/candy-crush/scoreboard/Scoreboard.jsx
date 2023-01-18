import "./scoreboard.scss"

export default function Scoreboard({ score, moves, level }) {
    return(
        <div className="scoreboard">
            <h2>Score: {score}</h2>
            <h2>Moves Remaining: {moves > 0 ? moves : "Game Over"}</h2>
            <h2>Level: {level}</h2>
        </div>
    )
}