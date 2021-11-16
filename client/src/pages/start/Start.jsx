import './start.scss'
import Navbar from '../../components/navbar/Navbar'
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useParams } from "react-router"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'

export default function Start() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const gameId = useParams().gameId;
    const {user: user, dispatch} = useContext(AuthContext)

    const [game, setGame] = useState({})
    const [isFavourite, setIsFavourite] = useState(user.favGames.includes(gameId))
    const [isRecentPlayed, setIsRecentPlayed] = useState(user.recentGames.includes(gameId))

    useEffect(() => {
        const fetchGame = async () => {
            const res = await axios.get(`/games/${gameId}`)
            console.log(res.data)
            setGame(res.data)
        }
        fetchGame()
    },[gameId])

    const favouriteHandler = async () => {
        try {
            if(isFavourite) {
                await axios.put(`/users/${game._id}/remove-from-favourites`, {
                    userId: user._id
                })
                dispatch({ type: "UNFAVOURITE", payload: game._id })
            }
            else {
                await axios.put(`/users/${game._id}/add-to-favourites`, {
                    userId: user._id
                })
                dispatch({ type: "FAVOURITE", payload: game._id })
            }
            setIsFavourite(!isFavourite)
        }
        catch(err) {

        }
    }

    const recentlyPlayedHandler = async () => {
        try {
            if(isRecentPlayed) {
                await axios.put(`/users/${game._id}/remove-from-recently-played`, {
                    userId: user._id
                })
                dispatch({ type: "REMOVEFROMRECENTLYPLAYED", payload: game._id})
            }
            await axios.put(`/users/${game._id}/add-to-recently-played`, {
                userId: user._id
            })
            dispatch({ type: "ADDTORECENTLYPLAYED", payload: game._id })
            setIsRecentPlayed(true)
        }
        catch(err) {

        }
    }

    return (
        <>
           <Navbar />
           <div className="startPageContainer">
                <div className="startContainer">
                    <div className="leftContainer">
                       <img src={game.thumbnail ? PF+game.thumbnail : PF+"profile-pic.jpg"} alt="" className="thumbnail" /> 
                    </div>
                    <div className="rightContainer">
                        <h2>{game.name}</h2>
                        <div className="gameBtns">
                            <div>
                                {/* <Link to={}>  */}
                                    <button className="button playBtn" onClick={recentlyPlayedHandler}>Play</button>
                                {/* </Link> */}
                            </div>
                            <div>
                                <button className="button addFavouriteBtn" onClick={favouriteHandler}>
                                    {isFavourite ? "Remove from favourites" : "Add to favourites"}
                                </button>  
                            </div>
                            <div>
                                <Link to={`/leaderboard/${game._id}`}> 
                                <button className="button leaderboardBtn">Leaderboard</button>  
                                </Link>
                            </div>
                        </div>  
                    </div>
                    
                </div>
            </div>
        </>
    )
}
