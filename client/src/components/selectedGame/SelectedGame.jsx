import './selectedGame.scss'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

export default function SelectedGame() {
    return (
        <div className="selectedGameContainer">
            {/* <div className="button cancel" onClick={modalHandler}><CloseIcon /></div> */}
            <img src='../../assets/profile-pic.jpg' alt="" className="thumbnail" />
            <div className="gameBtns">
                <button className="button leaderboardBtn">Leaderboard</button>
                <button className="button addFavourite">Add to favourites</button>
                <button className="button playBtn">Play</button> 
            </div>            
        </div>
    )
}
