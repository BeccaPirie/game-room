import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./edit.scss";
import { useState, useContext, useRef } from "react";
import { AuthContext } from '../../context/AuthContext'

export default function Edit() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: user, dispatch } = useContext(AuthContext)
    const [file, setFile] = useState(null)

    const profilePic = useRef()
    const username = useRef()
    const email = useRef()
    const oldPassword = useRef()
    const newPassword = useRef()
    const confirmPassword = useRef()

    const updateProfileClick = async (e) => {
        e.preventDefault() 
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
                                        ref={profilePic}
                                    />
                                </label>
                            </div>
                        </div>

                        

                        <label htmlFor="updateUsername">Username</label>
                        <input
                            id="updateUsername"
                            className="updateInput"
                            ref={username}
                        />

                        <label htmlFor="updateEmail">Email</label>
                        <input
                            type="email"
                            id="updateEmail"
                            className="updateInput"
                            ref={email}
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
