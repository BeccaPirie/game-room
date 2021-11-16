import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import GamesDisplay from "../../components/gamesDisplay/GamesDisplay";
// import { Select } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import { Link } from "react-router-dom"

export default function Home() {
    const [favGames, setFavGames] = useState([])
    const [recentGames, setRecentGames] = useState([])
    const [games, setGames] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(()=> {
        const fetchFavouriteGames = async () => {
            const res = await axios.get(`/users/favourite-games/${user.username}`)
            console.log(res.data)
            setFavGames(res.data)
        }
        fetchFavouriteGames();
    },[user])

    useEffect(()=> {
        const fetchRecentGames = async () => {
            const res = await axios.get(`/users/recently-played-games/${user.username}`)
            console.log(res.data)
            setRecentGames(res.data)
        }
        fetchRecentGames();
    },[user])

    useEffect(()=> {
        const fetchAllGames = async () => {
            const res = await axios.get("games/all")
            console.log(res.data)
            setGames(res.data)
        }
        fetchAllGames();
    },[])
    

    return (
        <>
            <Navbar/>
            <div className="homeContainer">
                <div className="gamesContainer">
                    <div className="welcome">Welcome back <Link to={`/profile/${user.username}`}><b>{user.username}</b></Link></div>

                    <div className="gamesDiv">
                        <p>Your Favourite Games</p>
                        <GamesDisplay games={favGames}/>
                    </div>

                    <div className="gamesDiv">
                        <p>Your Recently Played Games</p>
                        <GamesDisplay games={recentGames}/>
                    </div>

                    <div className="gamesDiv">
                        <p>All Games</p>
                        <GamesDisplay games={games}/>
                    </div>
                </div>
                <Rightbar/>
                
            </div>
        </>
    )
}
