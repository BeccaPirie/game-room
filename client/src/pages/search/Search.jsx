import './search.scss'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import UserListItem from '../../components/userListItem/UserListItem'

export default function Search() {
    return (
        <div>
            <>
            <Navbar />
            <div className="searchPageContainer">
                <div className="searchContainer">
                    
                    <div className="searchbar">
                        <div className="wrap">
                            <input placeholder="Search for user" className="searchInput" />
                        <input type="submit"value="Search" className="searchBtn" />
                        </div>
                        
                    </div>
                
                    <div className="searchResults">
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
                <Rightbar />
            </div>
        </>
        </div>
    )
}
