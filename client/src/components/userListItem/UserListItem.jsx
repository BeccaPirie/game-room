import './userListItem.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from "react"
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function UserListItem({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser, dispatch } = useContext(AuthContext)
    const [isFollowing, setIsFollowing] = useState(currentUser.following.includes(user?._id))

    useEffect(()=> { 
        setIsFollowing(currentUser.following.includes(user?._id))
    }, [currentUser, currentUser.following, user._id])

    const followHandler = async () => {
        console.log("follow handler")
        try {
            if (isFollowing) {
                console.log("unfollowing")
            await axios.put(`/users/${user._id}/unfollow`, {
                userId: currentUser._id
            }) 
            dispatch({ type: "UNFOLLOW", payload: user._id });
            }
            else {
                console.log("following")
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id
                })
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setIsFollowing(!isFollowing)
        }
        catch(err) {

        }    
    }

    return (
        <div className="userListItem">
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"profile-pic.jpg"} alt="" className="profile-thumbnail" />
            <div className="userDetails">
                <span className="itemUsername">
                    <Link to={`/profile/${user.username}`}>
                        {user.username}
                    </Link>
                </span>
                <button className="followBtn" onClick={followHandler}>
                    {isFollowing ? "following" : "follow"}
                </button>
            </div>
        </div>
    )
}
