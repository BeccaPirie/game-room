import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import GamesDisplay from "../../components/gamesDisplay/GamesDisplay";
import SelectedGame from "../../components/selectedGame/SelectedGame";
// import { Select } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'

export default function Home() {
    const [showModal, setshowModal] = useState(false)
    const [favGames, setFavGames] = useState([])
    const [recentGames, setRecentGames] = useState([])
    const [games, setGames] = useState([])
    const { user } = useContext(AuthContext)

    const modalHandler = () => {
        setshowModal(!showModal)
    }

    useEffect(()=> {
        const fetchFavouriteGames = async () => {
            const res = await axios.get(`/games/favourite-games/${user.username}`)
            console.log(res.data)
            setFavGames(res.data)
        }
        fetchFavouriteGames();
    },[user])

    useEffect(()=> {
        const fetchRecentGames = async () => {
            const res = await axios.get(`/games/recently-played-games/${user.username}`)
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
                    {showModal && <SelectedGame modalHandler={modalHandler}/>}
                    <div className="welcome">Welcome back <b>{user.username}</b></div>

                    <div className="gamesDiv">
                        <p>Your Favourite Games</p>
                        <GamesDisplay games={favGames} modalHandler={modalHandler}/>
                    </div>

                    <div className="gamesDiv">
                        <p>Your Recently Played Games</p>
                        <GamesDisplay games={recentGames} modalHandler={modalHandler}/>
                    </div>

                    <div className="gamesDiv">
                        <p>All Games</p>
                        <GamesDisplay games={games} modalHandler={modalHandler}/>
                    </div>
                </div>
                <Rightbar/>
                
            </div>
        </>
    )
}
