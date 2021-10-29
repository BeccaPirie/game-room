import './followers.scss'
import Navbar from '../../components/navbar/Navbar'
import UserListItem from '../../components/userListItem/UserListItem'
import Rightbar from '../../components/rightbar/Rightbar'

export default function Followers() {
    return (
        <>
          <Navbar/>
            <div className="followersPageContainer">
                <div className="followersContainer">
                    <p>Followers</p>
                    <div className="followersUserList">
                        <UserListItem />
                        <UserListItem />
                        <UserListItem />
                        <UserListItem />
                        <UserListItem />
                        <UserListItem />
                        <UserListItem />
                        <UserListItem />
                        <UserListItem />
                    </div>
                </div>
                <Rightbar/>
            </div>  
        </>
    )
}
