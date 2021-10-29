import './userListItem.scss'

export default function UserListItem() {
    return (
        <div className="userListItem">
            <img src="../../assets/profile-pic.jpg" alt="" className="profile-thumbnail" />
            <div className="userDetails">
                <span className="itemUsername">becca_pirie</span>
                <button className="followBtn">Follow</button>
            </div>
        </div>
    )
}
