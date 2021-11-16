import './navbar.scss'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import Dropdown from '../dropdown/Dropdown';
import { useState } from 'react';
import { Link } from "react-router-dom"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'

export default function Navbar() {
    const { user } = useContext(AuthContext)
    const [showDropdown, setshowDropdown] = useState(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const dropdownHandler = () => {
        setshowDropdown(!showDropdown)
    }

    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Game Room</span>
                </Link>
            </div>
            <div className="navbarCentre"></div>
            <div className="navbarRight">
                <div className="accountBtn" onClick={dropdownHandler}>
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"no-avatar.png"} alt="" className="accountProfilePicture" />
                    <span className="accountUsername">{user.username}</span>
                    <span className="arrow">
                        {showDropdown ? <ArrowDropUp/> : <ArrowDropDown/>}   
                    </span>
                </div>
                {showDropdown && <Dropdown user={user}/>}
            </div>
        </div>
    )
}