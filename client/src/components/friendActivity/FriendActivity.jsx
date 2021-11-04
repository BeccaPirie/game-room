import './friendActivity.scss'

export default function FriendActivity({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="friendActivityListItem">
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"profile-pic.jpg"} alt="" className="friendActivityProfileImg" />
            <div className="friendActivityDetails">
                <div className="friendActivityUsername">{user.username}</div>
                <div className="friendActivityLastPlayed">Last Played: {user.lastPlayed}</div>
            </div>
        </li>
    )
}
