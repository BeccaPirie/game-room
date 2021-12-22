import './dropdown.scss'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

export default function Dropdown({ user }) {
    const { dispatch } = useContext(AuthContext)

    const handleLogOutClick = () => {
        dispatch({type: "LOGOUT"})
    }

    return (
        <div className="dropdownList">
            <ul>
                <Link to={`/profile/${user.username}`}>
                    <li>Profile</li>
                </Link>
                <Link to={`/edit`}>
                    <li>Settings</li>
                </Link>
                <Link to={`/`}>
                   <li onClick={handleLogOutClick}>Log out</li> 
                </Link>
            </ul>
        </div>
    )
}
