import './dropdown.scss'
import { MenuItems } from '../menuItems/MenuItems'
import { Link } from 'react-router-dom';

export default function Dropdown() {

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
