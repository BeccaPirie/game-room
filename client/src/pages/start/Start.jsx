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
    const {user, dispatch} = useContext(AuthContext)

    const [game, setGame] = useState({})
    const [isFavourite, setIsFavourite] = useState(user.favGames.includes(gameId))
    const [isRecentPlayed, setIsRecentPlayed] = useState(user.recentGames.includes(gameId))

    useEffect(() => {
        const fetchGame = async () => {
            const res = await axios.get(`/games/${gameId}`)
            setGame(res.data)
        }
        fetchGame()
    },[gameId])

    useEffect(() => {
        setIsFavourite(user.favGames.includes(gameId))
    }, [user, user.favGames, gameId])

    useEffect(() => {
        setIsRecentPlayed(user.recentGames.includes(gameId))
    }, [user, user.recentGames, gameId])

    const favouriteHandler = async () => {
        try {
            if(isFavourite) {
                await axios.put(`/users/${game._id}/remove-from-favourites`, {
                    userId: user._id
                }, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                dispatch({ type: "UNFAVOURITE", payload: game._id })
            }
            else {
                await axios.put(`/users/${game._id}/add-to-favourites`, {
                    userId: user._id
                }, {
                    headers: {authorization:'Bearer ' + user.token}
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

            await axios.put(`/users/${game._id}/last-played`, {
                userId: user._id
            })  
            dispatch({ type: "LASTPLAYED", payload: game._id})
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
                       <img src={game.thumbnail ? PF+game.thumbnail : PF+"no-image.jpg"} alt="" className="thumbnail" /> 
                    </div>
                    <div className="rightContainer">
                        <h2>{game.name}</h2>
                        <div className="gameBtns">
                            <div>
                                {game.name === "candy-crush" ? 
                                <Link to={`/play/${game.name}`}> 
                                    <button className="button playBtn" onClick={recentlyPlayedHandler}>Play</button>
                                </Link> :
                                    <button className="button playBtn" onClick={recentlyPlayedHandler} disabled>Play</button>
                                }
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
