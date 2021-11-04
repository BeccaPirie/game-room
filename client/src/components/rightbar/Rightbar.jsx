import './rightbar.scss'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import FriendActivity from '../friendActivity/FriendActivity';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'

export default function Rightbar() {
    const { user } = useContext(AuthContext)
    const [following, setFollowing] = useState([])

    useEffect(() => {
        const fetchFollowing = async () => {
            const res = await axios.get(`users/following/${user.username}`)
            console.log(res.data)
            setFollowing(res.data)
        }
        fetchFollowing()
    },[user])

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="rightbarTop">
                    <span className="friendActivityTitle">Friend Activity</span>
                    {/* <Link to={}> */}
                        <PersonAddAlt1Icon className="addFriendIcon"/>
                    {/* </Link> */}
                </div>
                <ul className="friendActivityList">
                    {following.map((f) => (
                        <FriendActivity user={f}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}
