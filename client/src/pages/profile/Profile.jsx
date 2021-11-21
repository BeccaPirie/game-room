import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import TopScores from "../../components/topScores/TopScores";
import GamesDisplay from "../../components/gamesDisplay/GamesDisplay";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useParams } from "react-router"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;
    const { user: user, dispatch } = useContext(AuthContext)

    const [userProfile, setUserProfile] = useState({})
    const [favGames, setFavGames] = useState([])
    const [recentGames, setRecentGames] = useState([])
    const [isFollowing, setIsFollowing] = useState(user.following.includes(userProfile?._id))
    
    useEffect(()=> {
            const fetchUser = async () => {
                const res = await axios.get(`/users?username=${username}`)
                console.log(res.data)
                setUserProfile(res.data)
            }
            fetchUser();
        },[username])

    useEffect(()=> {
            setIsFollowing(user.following.includes(userProfile?._id))
        }, [user, user.following, userProfile._id])

    useEffect(()=> {
        const fetchFavouriteGames = async () => {
            const res = await axios.get(`/users/favourite-games/${username}`)
            console.log(res.data)
            setFavGames(res.data)
        }
        fetchFavouriteGames();
    },[username])

    useEffect(()=> {
        const fetchRecentGames = async () => {
            const res = await axios.get(`/users/recently-played-games/${username}`)
            console.log(res.data)
            setRecentGames(res.data)
        }
        fetchRecentGames();
    },[username])
    
    const followHandler = async () => {
        console.log("follow handler")
        try {
            if (isFollowing) {
                console.log("unfollowing")
            await axios.put(`/users/${userProfile._id}/unfollow`, {
                userId: user._id
            }) 
            dispatch({ type: "UNFOLLOW", payload: userProfile._id });
            }
            else {
                console.log("following")
                await axios.put(`/users/${userProfile._id}/follow`, {
                    userId: user._id
                })
                dispatch({ type: "FOLLOW", payload: userProfile._id });
            }
            setIsFollowing(!isFollowing)
        }
        catch(err) {

        }    
    }

    return (
        <div>
            <Navbar />

            <div className="profileContainer">
                
                <div className="userProfileContainer">

                    <div className="userInformation">

                        <div className="userDiv">
                        <img src={userProfile.profilePicture ? PF+userProfile.profilePicture : PF+"no-avatar.png"} alt="" className="profileImg" />
                            <div className="userDetailsProfile">
                                <div className="user">
                                    <h4 className="username">{userProfile.username}</h4>
                                    <p className="userId">{userProfile._id}</p>
                                </div>
                                <div className="userBtn">
                                    {
                                        user.username !== userProfile.username
                                        && <button className="button" onClick={followHandler}>
                                                {isFollowing ? "following" : "follow"}
                                            </button>
                                    }
                                    
                                </div>
                            </div> 
                        </div>
                        
                        <div className="userStats">
                            <div className="statsDiv pointsDiv">
                                <div className="statNumber">{parseInt(userProfile.points)}</div>
                                <div className="statWording">Points</div>
                            </div>
                            <div className="statsDiv followersDiv">
                                <div className="statNumber">
                                    <Link to={`/followers/${userProfile.username}`}>
                                        {userProfile.followers ? userProfile.followers.length : "0"}
                                    </Link>
                                </div>
                                <div className="statWording">Followers</div>
                            </div>
                            <div className="statsDiv followingDiv">
                                <div className="statNumber">
                                    <Link to={`/following/${userProfile.username}`}>
                                        {userProfile.following? userProfile.following.length : "0"}
                                    </Link>
                                </div>
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
                        {userProfile.topScores && userProfile.topScores.map((topScore) => {
                            return <TopScores key={topScore.gameId} topScore={topScore}/>
                        })}
                    </div>

                </div>

                <Rightbar />
            </div>
        </div>
    )
}
