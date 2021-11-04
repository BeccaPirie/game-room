import './following.scss'
import Navbar from '../../components/navbar/Navbar'
import UserListItem from '../../components/userListItem/UserListItem'
import Rightbar from '../../components/rightbar/Rightbar'
import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from 'axios'

export default function Following() {
    const username = useParams().username;
    const [following, setFollowing] = useState([])

    useEffect(() => {
        const fetchFollowing = async () => {
            const res = await axios.get(`/users/following/${username}`)
            console.log(res.data)
            setFollowing(res.data)
        }
        fetchFollowing()
    },[username])

    return (
        <>
          <Navbar/>
            <div className="followingPageContainer">
                <div className="followingContainer">
                    <p>Following</p>
                    <div className="followingUserList">
                        {following.map((user) => (
                        <UserListItem key={user._id} user={user}/>
                    ))}
                    </div>
                </div>
                <Rightbar/>
            </div>  
        </>
    )
}
