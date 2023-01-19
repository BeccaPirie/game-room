import axios from 'axios';
import { useState, useEffect } from 'react';
import './leaderboardItem.scss'

export default function Leaderboard({ item, listNumber }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${item.userId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [item])
    
    return (
        <div className="leaderboardListItem">
            <p className="listNumber">{listNumber}</p>
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"no-avatar.png"} alt="" className="itemThumbnail" />
            <div className="leaderboardText">
                <span className="leaderboardUsername">{user.username}</span>
                <span className="leaderboardScore">{item.score}</span>
            </div>
        </div>
    )
}
