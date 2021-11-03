import './gamesDisplay.scss'

export default function ProfileGamesDisplay({ games, modalHandler }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="favouritedGames">
            {games.map((game) => (
                <img key={game.name} src={`${PF}profile-pic.jpg`} alt="" className="favouriteGameImg" onClick={modalHandler}/>
            ))}
        </div>
    )
}
