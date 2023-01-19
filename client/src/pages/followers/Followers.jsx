import './followers.scss'
import Navbar from '../../components/navbar/Navbar'
import UserListItem from '../../components/userListItem/UserListItem'
import Rightbar from '../../components/rightbar/Rightbar'
import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from 'axios'

export default function Followers() {
    const username = useParams().username;
    const [followers,  setFollowers] = useState([])

    useEffect(() => {
        const fetchFollowers = async () => {
            const res = await axios.get(`/users/followers/${username}`)
            setFollowers(res.data)
        }
        fetchFollowers()
    },[username])

    return (
        <>
          <Navbar/>
            <div className="followersPageContainer">
                <div className="followersContainer">
                    <p>Followers</p>
                    <div className="followersUserList">
                        {followers.map((follower) => (
                        <UserListItem key={follower._id} user={follower}/>
                    ))}
                    </div>
                </div>
                <Rightbar/>
            </div>  
        </>
    )
}
