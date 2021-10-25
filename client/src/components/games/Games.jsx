import Game from '../game/Game'
import './games.scss'

export default function Games() {
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
        <div className="gamesContainer">
            {games.map((game) => <Game key={game.id} game={game}/>)}
        </div>
    )
}
