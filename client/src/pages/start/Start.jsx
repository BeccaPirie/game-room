import './start.scss'
import Navbar from '../../components/navbar/Navbar'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router"
import { Link } from 'react-router-dom';

export default function Start() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const gameId = useParams().gameId;
    const [game, setGame] = useState({})

    useEffect(() => {
        const fetchGame = async () => {
            const res = await axios.get(`/games/${gameId}`)
            console.log(res.data)
            setGame(res.data)
        }
        fetchGame()
    },[gameId])

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
                                    <button className="button playBtn">Play</button>
                                {/* </Link> */}
                            </div>
                            <div>
                                {/* <Link to={}>  */}
                                    <button className="button addFavouriteBtn">Add to favourites</button>  
                                {/* </Link> */}
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
