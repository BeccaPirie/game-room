import './topScores.scss';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function TopScores({ topScore }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const [game, setGame] = useState({})

    useEffect(() => {
        const fetchGame = async () => {
            const res = await axios.get(`/games/${topScore.gameId}`)
            setGame(res.data)
        }
        fetchGame()
    },[topScore])

    return (
        <div className="topScoresItem">
            <img src={game.thumbnail ? PF+game.thumbnail : PF+"no-image.jpg"} alt="" className="gameThumbnail" />
            <div className="topScoreText">
                <span className="gameTitle">{game.name}</span>
                <span className="score">{topScore.score}</span>
            </div>
        </div>
    )
}
