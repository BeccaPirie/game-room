import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import LeaderboardItem from '../../components/leaderboardItem/LeaderboardItem'
import './leaderboard.scss'
import { useParams } from "react-router"
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Leaderboard() {
    const gameId = useParams().gameId
    const [game, setGame] = useState({})

    useEffect(() => {
        const fetchGame = async () => {
            const res = await axios.get(`/games/${gameId}`)
            console.log(res.data)
            setGame(res.data)
        }
        fetchGame()
    }, [gameId])

    return (
        <>
            <Navbar />
            <div className="leaderboardPageContainer">
                <div className="leaderboardContainer">
                    

                    <div className="leaderboard">
                        <h2>{game.name}</h2>

                        <div className="options">
                            <div className="allButton selected">All</div>
                            <div className="friendsButton">Friends</div>
                        </div>
                        
                        
                        <div className="leaderboardItems">
                            <LeaderboardItem />
                            <LeaderboardItem />
                            <LeaderboardItem />
                            <LeaderboardItem />
                            <LeaderboardItem />
                            <LeaderboardItem />                                                        
                        </div>
                    </div>
                </div>
                <Rightbar />
            </div>
        </>
    )
}
