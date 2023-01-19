import './search.scss'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import UserListItem from '../../components/userListItem/UserListItem'
import { useState } from 'react'
import axios from 'axios'

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const onChangeSearch = (e) => {
        setSearchTerm(e.currentTarget.value)
    }

    const getSearchResults = async () => {
        const res = await axios.get(`/users/getUsers/${searchTerm}`)
        setSearchResults(res.data)
    }
    
    return (
        <div>
            <Navbar />
            <div className="searchPageContainer">
                <div className="searchContainer">
                    
                    <div className="searchbar">
                        <div className="wrap">
                            <input
                                placeholder="Search for user"
                                value={searchTerm}
                                onChange={onChangeSearch}
                                className="searchInput"
                            />
                            <input
                                type="submit"
                                value="Search"
                                className="searchBtn"
                                onClick={getSearchResults}
                            />
                        </div>
                        
                    </div>
                
                    <div className="searchResults">
                        {searchResults.map((result) => (
                        <UserListItem key={result._id} user={result}/>
                    ))}
                    </div>

                </div>
                <Rightbar />
            </div>
        </div>
    )
}
