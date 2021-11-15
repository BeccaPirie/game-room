import './friendActivity.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios';

export default function FriendActivity({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [lastPlayed, setLastPlayed] = useState({})

    useEffect(() => {
        const fetchLastPlayed = async () => {
            if(user.lastPlayed !== "") {
               const res = await axios.get(`/games/${user.lastPlayed}`)
                console.log(res.data)
                setLastPlayed(res.data) 
            }
            else {
                setLastPlayed("")
            }
        }
        fetchLastPlayed()
    },[user])

    return (
        <li className="friendActivityListItem">
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"profile-pic.jpg"} alt="" className="friendActivityProfileImg" />
            <div className="friendActivityDetails">
            
                <div className="friendActivityUsername">
                    <Link to={`/profile/${user.username}`}>
                        {user.username}
                    </Link>
                </div>
            
                <div className="friendActivityLastPlayed">
                    <span>Last Played: </span>
                    {user.lastPlayed !== "" &&
                    <Link to={`/start/${user.lastPlayed}`}>
                        {` ${lastPlayed.name}`}
                    </Link>
                    }
                    
                </div>
            </div>
        </li>
    )
}
