import './userProfile.scss';
import TopScores from '../topScores/TopScores';

export default function userProfile() {
    return (
        <div className="userProfileContainer">

            <div className="userInformation">

                <div className="userDiv">
                   <img src="../assets/profile-pic.jpg" alt="" className="profileImg" />
                    <div className="userDetails">
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

            <div className="userTopScores">
                {/* <ul> */}
                    <TopScores />
                    <TopScores />
                    <TopScores />
                {/* </ul> */}
            </div>

        </div>
    )
}
