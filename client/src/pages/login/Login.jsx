import './login.scss'
import { useRef, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const { user, isFetching, dispatch} = useContext(AuthContext)

    const handleClick = async (e) => {
        e.preventDefault()
        const userCredentials = {
            email: email.current.value,
            password: password.current.value
        }
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("auth/login", userCredentials)
            dispatch({ type:"LOGIN_SUCCESS", payload: res.data });
        }
        catch(err) {
            dispatch({ type:"LOGIN_FAILURE", payload: err });
        }
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
                <Link to="/register">
                    <button className="loginRegisterButton">
                    {isFetching ? <CircularProgress /> : "Create a New Account"}
                    </button>
                </Link>
            </form>
        </div>
    )
}
