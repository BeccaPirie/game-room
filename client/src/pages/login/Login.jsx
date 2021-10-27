import './login.scss'

export default function Login() {
    return (
        <div className="login">
            <div className="loginBox">
                <h3 className="loginTitle">Game Room</h3>
                <input placeholder="Email" className="loginInput" />
                <input placeholder="Password" className="loginInput" />
                <button className="loginButton">Log In</button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton">Create a New Account</button>
            </div>

        </div>
    )
}
