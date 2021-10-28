import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import LeaderboardItem from '../../components/leaderboardItem/LeaderboardItem'
import './leaderboard.scss'

export default function Leaderboard() {
    return (
        <>
            <Navbar />
            <div className="leaderboardPageContainer">
                <div className="leaderboardContainer">
                    

                    <div className="leaderboard">
                        <p>Tetris</p>

                        <div className="options">
                            <div className="allButton selected">All</div>
                            <div className="friendsButton">Friends</div>
                        </div>
                        
                        
                        <div className="leaderboardItems">
                            <LeaderboardItem />
                            <LeaderboardItem />
                            <LeaderboardItem />
                            <LeaderboardItem />
                            <LeaderboardItem />
                            <LeaderboardItem />                                                        
                        </div>
                    </div>
                </div>
                <Rightbar />
            </div>
        </>
    )
}
