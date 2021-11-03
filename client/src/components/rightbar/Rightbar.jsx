import './rightbar.scss'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import FriendActivity from '../friendActivity/FriendActivity';
// import { Link } from 'react-router-dom';

export default function Rightbar() {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="rightbarTop">
                    <span className="friendActivityTitle">Friend Activity</span>
                    {/* <Link to={}> */}
                        <PersonAddAlt1Icon className="addFriendIcon"/>
                    {/* </Link> */}
                </div>
                <ul className="friendActivityList">
                    <FriendActivity/>
                </ul>
            </div>
        </div>
    )
}
