import './userListItem.scss'
import { Link } from 'react-router-dom'

export default function UserListItem({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="userListItem">
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"profile-pic.jpg"} alt="" className="profile-thumbnail" />
            <div className="userDetails">
                <span className="itemUsername">
                    <Link to={`/profile/${user.username}`}>
                        {user.username}
                    </Link>
                </span>
                <button className="followBtn">Follow</button>
            </div>
        </div>
    )
}
