import './userListItem.scss'

export default function UserListItem() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="userListItem">
            <img src={`${PF}profile-pic.jpg`} alt="" className="profile-thumbnail" />
            <div className="userDetails">
                <span className="itemUsername">becca_pirie</span>
                <button className="followBtn">Follow</button>
            </div>
        </div>
    )
}
