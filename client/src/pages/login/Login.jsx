import './login.scss'
import { useRef, useContext } from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@mui/material'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch} = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({
            email: email.current.value,
            password: password.current.value
        }, dispatch)
    }

    console.log(user)

    return (
        <div className="login">
            <form className="loginBox" onSubmit={handleClick}>
                <h3 className="loginTitle">Game Room</h3>
                <input
                    type="email"
                    required
                    placeholder="Email"
                    className="loginInput"
                    ref={email}
                />
                <input
                    type="password"
                    required
                    minLength="6"
                    placeholder="Password"
                    className="loginInput"
                    ref={password}
                />
                <button className="loginButton" disabled={isFetching}>
                    {isFetching ? <CircularProgress /> : "Log In"}
                </button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton">
                {isFetching ? <CircularProgress /> : "Create a New Account"}
                </button>
            </form>
        </div>
    )
}
