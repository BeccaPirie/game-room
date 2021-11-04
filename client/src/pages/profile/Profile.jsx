import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import TopScores from "../../components/topScores/TopScores";
import GamesDisplay from "../../components/gamesDisplay/GamesDisplay";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router"

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;

    const [user, setUser] = useState({})
    const [favGames, setFavGames] = useState([])
    const [recentGames, setRecentGames] = useState([])

    useEffect(()=> {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`)
            console.log(res.data)
            setUser(res.data)
        }
        fetchUser();
    },[username])

    useEffect(()=> {
        const fetchFavouriteGames = async () => {
            const res = await axios.get(`/games/favourite-games/${username}`)
            console.log(res.data)
            setFavGames(res.data)
        }
        fetchFavouriteGames();
    },[username])

    useEffect(()=> {
        const fetchRecentGames = async () => {
            const res = await axios.get(`/games/recently-played-games/${username}`)
            console.log(res.data)
            setRecentGames(res.data)
        }
        fetchRecentGames();
    },[username])    

    return (
        <div>
            <Navbar />

            <div className="profileContainer">
                
                <div className="userProfileContainer">

                    <div className="userInformation">

                        <div className="userDiv">
                        <img src={user.profilePicture ? PF+user.profilePicture : PF+"profile-pic.jpg"} alt="" className="profileImg" />
                            <div className="userDetailsProfile">
                                <div className="user">
                                    <h4 className="username">{user.username}</h4>
                                    <p className="userId">{user._id}</p>
                                </div>
                                <div className="userBtn">
                                    <button className="button">following</button>
                                </div>
                            </div> 
                        </div>
                        
                        <div className="userStats">
                            <div className="statsDiv pointsDiv">
                                <div className="statNumber">{user.points}</div>
                                <div className="statWording">Points</div>
                            </div>
                            <div className="statsDiv followersDiv">
                                <div className="statNumber">{user.followers ? user.followers.length : "0"}</div>
                                <div className="statWording">Followers</div>
                            </div>
                            <div className="statsDiv followingDiv">
                                <div className="statNumber">{user.following? user.following.length : "0"}</div>
                                <div className="statWording">Following</div>
                            </div>
                        </div>
                    </div>

                    <div className="gamesOuterDiv">
                        <p>Favourite Games</p>
                        <GamesDisplay games={favGames}/>
                    </div>

                    <div className="recentlyPlayed gamesOuterDiv">
                        <p>Recently Played Games</p>
                        <GamesDisplay games={recentGames}/>
                    </div>

                    <div className="userTopScores">
                        <p>Top Scores</p>
                        <TopScores/>
                        <TopScores />
                        <TopScores />
                    </div>

                </div>

                <Rightbar />
            </div>
        </div>
    )
}
