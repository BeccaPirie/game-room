import './navbar.scss'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import Dropdown from '../dropdown/Dropdown';
import { useState } from 'react';
import { Link } from "react-router-dom"

export default function Navbar() {
    const [showDropdown, setshowDropdown] = useState(false)

    const dropdownHandler = () => {
        setshowDropdown(!showDropdown)
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
                    <img src={`${PF}profile-pic.jpg`} alt="" className="accountProfilePicture" />
                    <span className="accountUsername">becca_pirie</span>
                    <span className="arrow">
                        {showDropdown ? <ArrowDropUp/> : <ArrowDropDown/>}   
                    </span>
                </div>
                {showDropdown && <Dropdown />}
            </div>
        </div>
    )
}