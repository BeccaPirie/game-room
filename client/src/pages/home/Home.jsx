import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Game from "../../components/game/Game";

export default function Home() {
    const games = [
        {
            id:1,
            title:"tetris",
            thumbnail:"../../assets/profile-pic.jpg",
        },
        {
            id:2,
            title:"candy crush",
            thumbnail:"../../assets/profile-pic.jpg",
        },
        {
            id:3,
            title:"tic-tac-toe",
            thumbnail:"../../assets/profile-pic.jpg",
        }
    ]

    return (
        <>
            <Navbar/>
            <div className="homeContainer">
                <div className="gamesContainer">
                    {games.map((game) => <Game key={game.id} game={game}/>)}
                </div>
                <Rightbar/>
            </div>
        </>
    )
}
