import './register.scss'

export default function Register() {
    return (
        <div className="login">

            <div className="loginBox">
                <h3 className="loginTitle">Game Room</h3>
                <input placeholder="Username" className="loginInput" />
                <input placeholder="Email" className="loginInput" />
                <input placeholder="Password" className="loginInput" />
                <input placeholder="Password Again" className="loginInput" />
                <button className="loginButton">Sign Up</button>
                <button className="loginRegisterButton">Log into Account</button>
            </div>

        </div>
    )
}
