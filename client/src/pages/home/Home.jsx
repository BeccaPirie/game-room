import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Game from "../../components/game/Game";
import GamesDisplay from "../../components/gamesDisplay/GamesDisplay";
import SelectedGame from "../../components/selectedGame/SelectedGame";
import { Select } from "@mui/material";
import { useState } from "react";

export default function Home() {
    const [showModal, setshowModal] = useState(false)

    const modalHandler = () => {
        setshowModal(!showModal)
    }

    return (
        <>
            <Navbar/>
            <div className="homeContainer">
                <div className="gamesContainer">
                    {/* {games.map((game) => <Game key={game.id} game={game}/>)} */}
                {/* </div> */}
                    {showModal && <SelectedGame modalHandler={modalHandler}/>}
                    <div className="welcome">Welcome back <b>Rebecca</b>!</div>

                    <div className="gamesDiv">
                        <p>Your Favourite Games</p>
                        <GamesDisplay modalHandler={modalHandler}/>
                    </div>

                    <div className="gamesDiv">
                        <p>Your Recently Played Games</p>
                        <GamesDisplay modalHandler={modalHandler}/>
                    </div>

                    <div className="gamesDiv">
                        <p>All Games</p>
                        <GamesDisplay modalHandler={modalHandler}/>
                    </div>
                </div>
                <Rightbar/>
                
            </div>
        </>
    )
}
