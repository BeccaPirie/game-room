import './navbar.scss'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import Dropdown from '../dropdown/Dropdown';
import { useState } from 'react';

export default function Navbar() {
    const [showDropdown, setshowDropdown] = useState(false)

    const dropdownHandler = () => {
        setshowDropdown(!showDropdown)
    }

    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <span className="logo">Game Room</span>
            </div>
            <div className="navbarCentre"></div>
            <div className="navbarRight">
                <div className="accountBtn" onClick={dropdownHandler}>
                    <img src="../../assets/profile-pic.jpg" alt="" className="accountProfilePicture" />
                    <span className="accountUsername">becca_pirie</span>
                    <span className="arrow">
                        {showDropdown ? <ArrowDropUp/> : <ArrowDropDown/>}   
                    </span>
                </div>
                <Dropdown show={showDropdown} />
            </div>
        </div>
    )
}