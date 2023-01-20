import "./candyCrushScoreboard.scss"

export default function CandyCrushScoreboard({ score, moves, level }) {
    return(
        <div className="scoreboard-container">
            <div className="scoreboard">
                <h2 className="scoreboard-score">Score: {score}</h2>
                <h2 className="scoreboard-moves">Moves Remaining: {moves}</h2>
                <h2 className="scoreboard-level">Level: {level}</h2>
            </div>
        </div>
    )
}