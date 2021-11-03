import './selectedGame.scss'
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import StarIcon from '@mui/icons-material/Star';
// import CloseIcon from '@mui/icons-material/Close';

export default function SelectedGame() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="selectedGameContainer">
            {/* <div className="button cancel" onClick={modalHandler}><CloseIcon /></div> */}
            <img src={`${PF}profile-pic.jpg`} alt="" className="thumbnail" />
            <div className="gameBtns">
                <button className="button leaderboardBtn">Leaderboard</button>
                <button className="button addFavourite">Add to favourites</button>
                <button className="button playBtn">Play</button> 
            </div>            
        </div>
    )
}
