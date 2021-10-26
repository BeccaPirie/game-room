import './topScores.scss';

export default function TopScores() {
    return (
        <div className="topScoresItem">
            <img src="../../assets/profile-pic.jpg" alt="" className="gameThumbnail" />
            <div className="topScoreText">
                <span className="gameTitle">Tetris</span>
                <span className="score">123</span>
            </div>
        </div>
    )
}
