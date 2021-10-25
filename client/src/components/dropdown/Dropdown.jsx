import './dropdown.scss'
import { MenuItems } from '../menuItems/MenuItems'
import { Link } from 'react-router-dom';

export default function Dropdown({ onClick }) {

    return (
        <div className="dropdownList">
            <ul>
                {MenuItems.map((item, index) => {
                    return (
                        <Link to={item.path}>
                            <li key={index} onClick={onClick}>
                                {item.title}
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}
