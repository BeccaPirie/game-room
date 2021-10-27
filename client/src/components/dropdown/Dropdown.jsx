import './dropdown.scss'
import { Link } from 'react-router-dom';

export default function Dropdown() {
    const MenuItems = [
        {
            title: 'Profile',
            path: 'profile',
        },
        {
            title: 'Friends',
            path: 'friends',
        },
        {
            title: 'Log out',
            path: 'logout',
        }
    ]

    return (
        <div className="dropdownList">
            <ul>
                {MenuItems.map((item, index) => {
                    return (
                        <Link to={item.path}>
                            <li key={index} >
                                {item.title}
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}
