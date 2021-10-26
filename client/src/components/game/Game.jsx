import './game.scss'

export default function Game({ game }) {
    return (
        <div className="gameContainer">
            <img src={game.thumbnail} alt="" className="thumbnail" />
            <div className="gameBtns">
               <button className="button leaderboardBtn">Leaderboard</button>
                <button className="button playBtn">Play</button> 
            </div>
            
        </div>
    )
}
