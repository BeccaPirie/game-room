import './dropdown.scss'
import { Link } from 'react-router-dom';

export default function Dropdown({ user }) {
    const MenuItems = [
        {
            title: 'Profile',
            path: `/profile/${user.username}`,
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
