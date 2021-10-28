import './leaderboardItem.scss'

export default function Leaderboard() {
    return (
        <div className="leaderboardListItem">
            <p className="listNumber">1</p>
            <img src="../../assets/profile-pic.jpg" alt="" className="itemThumbnail" />
            <div className="leaderboardText">
                <span className="leaderboardUsername">becca_pirie</span>
                <span className="leaderboardScore">123</span>
            </div>
        </div>
    )
}
