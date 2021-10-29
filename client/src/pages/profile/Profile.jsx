import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import TopScores from "../../components/topScores/TopScores";
import GamesDisplay from "../../components/gamesDisplay/GamesDisplay";

export default function Profile() {
    return (
        <div>
            <Navbar />

            <div className="profileContainer">
                
                <div className="userProfileContainer">

                    <div className="userInformation">

                        <div className="userDiv">
                        <img src="../assets/profile-pic.jpg" alt="" className="profileImg" />
                            <div className="userDetailsProfile">
                                <div className="user">
                                    <h4 className="username">Rebecca</h4>
                                    <p className="userId">becca_pirie</p>
                                </div>
                                <div className="userBtn">
                                    <button className="button">following</button>
                                </div>
                            </div> 
                        </div>
                        
                        <div className="userStats">
                            <div className="statsDiv pointsDiv">
                                <div className="statNumber">1234</div>
                                <div className="statWording">Points</div>
                            </div>
                            <div className="statsDiv followersDiv">
                                <div className="statNumber">40</div>
                                <div className="statWording">Followers</div>
                            </div>
                            <div className="statsDiv followingDiv">
                                <div className="statNumber">40</div>
                                <div className="statWording">Following</div>
                            </div>
                        </div>
                    </div>

                    <div className="gamesOuterDiv">
                        <p>Favourite Games</p>
                        <GamesDisplay />
                    </div>

                    <div className="recentlyPlayed gamesOuterDiv">
                        <p>Recently Played Games</p>
                        <GamesDisplay />
                    </div>

                    <div className="userTopScores">
                        <p>Top Scores</p>
                        <TopScores />
                        <TopScores />
                        <TopScores />
                    </div>

                </div>

                <Rightbar />
            </div>
        </div>
    )
}
