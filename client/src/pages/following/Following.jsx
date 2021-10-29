import './following.scss'
import Navbar from '../../components/navbar/Navbar'
import UserListItem from '../../components/userListItem/UserListItem'
import Rightbar from '../../components/rightbar/Rightbar'

export default function Following() {
    return (
        <>
          <Navbar/>
            <div className="followingPageContainer">
                <div className="followingContainer">
                    <p>Following</p>
                    <div className="followingUserList">
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
