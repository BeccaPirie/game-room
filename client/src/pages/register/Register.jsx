import './register.scss'
import { useRef, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useHistory } from 'react-router'

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const history = useHistory()

    const handleClick = async (e) => {
        e.preventDefault()

        if(confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Passwords don't match")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                confirmPassword: confirmPassword.current.value
            }
            try {
                await axios.post("/auth/register", user)
                history.push('/login')
            } catch(err) {
                console.log(err)
            }
        }
        
    }

    return (
        <div className="login">
            <form className="loginBox" onSubmit={handleClick}>
                <h3 className="loginTitle">Game Room</h3>
                <input
                    required
                    placeholder="Username"
                    className="loginInput"
                    ref={username}
                />
                <input
                    type="email"
                    required
                    re
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
                <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                    className="loginInput"
                    ref={confirmPassword}
                />
                <button className="loginButton">Sign Up</button>
                <button className="loginRegisterButton">Log into Account</button>
            </form>
        </div>
    )
}
