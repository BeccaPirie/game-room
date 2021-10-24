import './rightbar.scss'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import FriendActivity from '../friendActivity/FriendActivity';

export default function Rightbar() {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="rightbarTop">
                    <span className="friendActivityTitle">Friend Activity</span>
                    <PersonAddAlt1Icon className="addFriendIcon"/>  
                </div>
                <ul className="friendActivityList">
                    <FriendActivity/>
                </ul>
            </div>
        </div>
    )
}
