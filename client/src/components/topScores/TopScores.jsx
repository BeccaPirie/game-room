import './topScores.scss';

export default function TopScores() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="topScoresItem">
            <img src={`${PF}profile-pic.jpg`} alt="" className="gameThumbnail" />
            <div className="topScoreText">
                <span className="gameTitle">Tetris</span>
                <span className="score">123</span>
            </div>
        </div>
    )
}
