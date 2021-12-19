import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./edit.scss";
import { useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext'
import axios from "axios";

export default function Edit() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: user, dispatch } = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [profilePicture, setProfilePicture] = useState(user.profilePicture)

    const updateProfileClick = async (e) => {
        e.preventDefault()
        
        if(file) {
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            console.log(fileName)
            setProfilePicture(file.name)
            console.log(profilePicture)
            try {
                await axios.post("/upload", data)
            }
            catch(err) {

            }
        }

        await axios.put(`users/${user._id}`, {
            userId: user._id,
            username: username,
            email: email,
            profilePicture: profilePicture
        })
        dispatch({ type: "UPDATEPROFILE", payload: user})
        window.location.reload()
    }

    const updatePasswordClick = async (e) => {
        e.preventDefault() 
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
                                {/* <img src={user.profilePicture ? PF+user.profilePicture : PF+"no-avatar.png"} alt="" className="profileImg" /> */}
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
                            // ref={oldPassword}
                        />

                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPasswordInput"
                            className="updateInput"
                            // ref={newPassword}
                        />

                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="oldPasswordInput"
                            className="updateInput"
                            // ref={confirmPassword}
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
