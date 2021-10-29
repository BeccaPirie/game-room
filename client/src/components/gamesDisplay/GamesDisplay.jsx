import './gamesDisplay.scss'

export default function ProfileGamesDisplay({modalHandler}) {

    return (
            <div className="favouritedGames">
                <img src="../assets/profile-pic.jpg" alt="" className="favouriteGameImg" onClick={modalHandler}/>
                <img src="../assets/profile-pic.jpg" alt="" className="favouriteGameImg" onClick={modalHandler}/>
                <img src="../assets/profile-pic.jpg" alt="" className="favouriteGameImg" onClick={modalHandler}/>
                <img src="../assets/profile-pic.jpg" alt="" className="favouriteGameImg" onClick={modalHandler}/>
                <img src="../assets/profile-pic.jpg" alt="" className="favouriteGameImg" onClick={modalHandler}/>
                <img src="../assets/profile-pic.jpg" alt="" className="favouriteGameImg" onClick={modalHandler}/>
                <img src="../assets/profile-pic.jpg" alt="" className="favouriteGameImg" onClick={modalHandler}/>
            </div>
    )
}
