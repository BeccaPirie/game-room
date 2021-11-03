import './friendActivity.scss'

export default function FriendActivity() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
        <li className="friendActivityListItem">
            <img src={`${PF}profile-pic.jpg`} alt="" className="friendActivityProfileImg" />
            <div className="friendActivityDetails">
                <div className="friendActivityUsername">becca_pirie</div>
                <div className="friendActivityLastPlayed">Last Played: Tetris</div>
            </div>
        </li>
        
        <li className="friendActivityListItem">
            <img src={`${PF}profile-pic.jpg`} alt="" className="friendActivityProfileImg" />
            <div className="friendActivityDetails">
                <div className="friendActivityUsername">becca_pirie</div>
                <div className="friendActivityLastPlayed">Last Played: Tetris</div>
            </div>
        </li>

        <li className="friendActivityListItem">
            <img src={`${PF}profile-pic.jpg`} alt="" className="friendActivityProfileImg" />
            <div className="friendActivityDetails">
                <div className="friendActivityUsername">becca_pirie</div>
                <div className="friendActivityLastPlayed">Last Played: Tetris</div>
            </div>
        </li>
    </>
    )
}
