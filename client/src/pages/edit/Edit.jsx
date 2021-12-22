import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./edit.scss";
import { useState, useContext, useRef } from "react";
import { AuthContext } from '../../context/AuthContext'
import axios from "axios";

export default function Edit() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: user, dispatch } = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const oldPassword = useRef()
    const newPassword = useRef()
    const confirmPassword = useRef()

    const updateProfileClick = async (e) => {
        e.preventDefault()

        const updatedUser = {
            ... user,
            username: username,
            email: email,
        }
        
        if(file) {
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            updatedUser.profilePicture = fileName
            try {
                await axios.post("/upload", data)
            }
            catch(err) {

            }
        }

        await axios.put(`users/${user._id}`, updatedUser)
        dispatch({ type: "UPDATEPROFILE", payload: updatedUser})
        window.location.reload()
    }

    const updatePasswordClick = async (e) => {
        e.preventDefault() 
        if(newPassword.current.value !== confirmPassword.current.value) {
            confirmPassword.current.setCustomValidity("Passwords don't match")
        }
        else {
            const updatedUser = {
                userId: user._id,
                oldPassword: oldPassword.current.value,
                newPassword: newPassword.current.value
            }

            await axios.put(`users/updatePassword/${user._id}`, updatedUser)
            dispatch({type: "UPDATEPASSWORD", payload: newPassword}) //*** */
            window.location.reload()
        }
    }

    return (
        <div>
            <Navbar />

            <div className="editContainer">
                
                <div className="editProfileContainer">

                    <form className="updateAccount" onSubmit={updateProfileClick}>
                        <h3>Update Profile</h3>
                        <div className="editProfilePicture">
                            <div className="profilePhotoDiv">
                                <img src={file ? URL.createObjectURL(file) : (user.profilePicture ? PF+user.profilePicture : PF+"no-avatar.png") } />
                            </div>
                            
                            <div className="changeProfilePicture">
                               <label htmlFor="file">
                                    Change profile picture
                                    <input
                                        style={{ display: "none" }}
                                        type="file"
                                        id="file"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </label>
                            </div>
                        </div>

                        <label htmlFor="updateUsername">Username</label>
                        <input
                            id="updateUsername"
                            className="updateInput"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label htmlFor="updateEmail">Email</label>
                        <input
                            type="email"
                            id="updateEmail"
                            className="updateInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button className="updateAccountBtn">
                            Update Account
                        </button>
                    </form>

                    <form className="updatePassword" onSubmit={updatePasswordClick}>
                        <h3>Change Password</h3>
                        <label htmlFor="oldPassword">Old Password</label>
                        <input
                            type="password"
                            id="oldPasswordInput"
                            className="updateInput"
                            ref={oldPassword}
                        />

                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPasswordInput"
                            className="updateInput"
                            ref={newPassword}
                        />

                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="oldPasswordInput"
                            className="updateInput"
                            ref={confirmPassword}
                        />

                        <button className="updatePasswordBtn">
                            Update Password
                        </button>
                    </form>

                </div>

                <Rightbar />
            </div>
        </div>
    )
}
