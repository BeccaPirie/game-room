import { AuthContext } from "../../context/AuthContext"
import { useContext, useState, useCallback } from "react"
import { useEffect } from "react"
import axios from 'axios'
import { useParams } from "react-router"
import "./endScreen.scss"
import { Link } from "react-router-dom"

export default function EndScreen({ score }) {
    const gameId = useParams().gameId
    const { user, dispatch } = useContext(AuthContext)
    const [topScore, setTopScore] = useState(user.topScores.find(score => score.gameId === gameId))
    const [isTopScore, setIsTopScore] = useState(false)

    // update top score
    const updateTopScore = useCallback(async (game) => {
        if(game) {
            await axios.put(`/users/update-top-score/${score}`, {
                userId: user._id,
                gameId: gameId
            }, {
                headers: {authorization:'Bearer ' + user.token}
            })

            dispatch({type:"UPDATETOPSCORE", payload:{
                gameId: gameId,
                score:parseInt(score)
            }})
        }
        else {
            await axios.put(`/users/add-top-score/${score}`, {
                userId: user._id,
                gameId: gameId
            }, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"ADDTOPSCORE", payload:{
                gameId: gameId,
                score: parseInt(score)
            }})
        }
    }, [gameId, score, user._id, dispatch, user.token])

    // add score to game collection
    useEffect(() => {
        const addScore = async () => {
            await axios.put(`/games/save-score/${gameId}`, {
                userId: user._id,
                score: score
            })
        }
        addScore()
    }, [score, user._id, gameId])

    // add score to users points
    useEffect(() => {
        const addPoints = async () => {
            await axios.put(`/users/add-user-points/${score}`, {userId: user._id}, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"UPDATEPOINTS", payload:parseInt(score)})
        }
        addPoints()
    }, [score, user._id, dispatch, user.token])

    // check if there is top score data for current game
    useEffect(() =>{
        const gameData = user.topScores.find(score => score.gameId === gameId)
        if((!gameData || score > gameData.score)) {
            setTopScore(gameData)
            updateTopScore(gameData)
            setIsTopScore(true)
        }
    },[user, score, gameId, updateTopScore])

    return(
        <div className="gameOver">
            <h1>Game over!</h1>
            {isTopScore && <h2>New high score!</h2>}
            <h2>Your score: {score}</h2>
            <h2>Your high score: {isTopScore ? score : (topScore ? topScore.score: "0")}</h2>
            <div className="endScreenBtnDiv">
                <Link to={`/start/${gameId}`}> 
                <button className="endBtn firstBtn">Game Home</button>  
                </Link>
            </div><div className="endScreenBtnDiv">
                <Link to={`/`}> 
                <button className="endBtn secondBtn">Exit</button>  
                </Link>
            </div>
        </div>
    )
}