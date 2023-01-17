import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import LeaderboardItem from '../../components/leaderboardItem/LeaderboardItem'
import './leaderboard.scss'
import { useParams } from "react-router"
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'

export default function Leaderboard() {
    const gameId = useParams().gameId
    const { user } = useContext(AuthContext)

    const [game, setGame] = useState({})
    const [scores, setScores] = useState([])
    const [allBtnActive, setAllBtnActive] = useState(true)
    const [friendBtnActive, setfriendBtnActive] = useState(false)

    useEffect(() => {
        if(game.scores) {
           sortScores(game.scores)
        }
    }, [game])

    useEffect(() => {
        const fetchGame = async () => {
            const res = await axios.get(`/games/${gameId}`)
            console.log(res.data)
            setGame(res.data)
        }
        fetchGame()
    }, [gameId])

    const allBtnHandler = () => {
        setAllBtnActive(true)
        setfriendBtnActive(false)
        if(game.scores) {
            sortScores(game.scores)
        }
    }

    const friendBtnHandler = () => {
        setAllBtnActive(false)
        setfriendBtnActive(true)
        const friendsScores = game.scores.filter((score) => 
            user.following.includes(score.userId) || score.userId === user._id
        )
        if(friendsScores) {
            sortScores(friendsScores)
         }
    }

    const sortScores = (scores) => {
        const sortScores = scores.sort((a,b) => parseFloat(b.score) - parseFloat(a.score))
        setScores(sortScores)
    }

    return (
        <>
            <Navbar />
            <div className="leaderboardPageContainer">
                <div className="leaderboardContainer"> 

                    <div className="leaderboard">
                        <h2>{game.name}</h2>

                        <div className="options">
                            <div className={allBtnActive ? "selected" : null} onClick={allBtnHandler}>All</div>
                            <div className={friendBtnActive ? "selected" : null} onClick={friendBtnHandler}>Friends</div>
                        </div>
                        
                        <div className="leaderboardItems">
                            {scores && scores.map((score, index) => {
                                return <LeaderboardItem key={index} item={score} listNumber={index + 1}/>
                            })}
                        </div>
                    </div>
                </div>
                <Rightbar />
            </div>
        </>
    )
}
