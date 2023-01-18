import './gamesDisplay.scss'
import { Link } from "react-router-dom"

export default function ProfileGamesDisplay({ games}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="favouritedGames">
            {games.map((game) => (
                <Link to={`/start/${game._id}`} key={game._id}>
                    <img key={game._id} src={PF+game.thumbnail || PF+"no-image.jpg"} alt="" className="favouriteGameImg"/>
                </Link>
            ))}
        </div>
    )
}
