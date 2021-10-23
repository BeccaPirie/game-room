import './dropdown.scss'
import { MenuItems } from '../menuItems/MenuItems'

export default function Dropdown({show}) {
    return (
        <span className={show ? "show" : "hide"}>
            <ul className="dropdownList">
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            {item.title}
                        </li>
                    )
                })}
            </ul>
        </span>
    )
}
