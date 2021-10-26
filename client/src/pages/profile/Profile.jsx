import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import UserProfile from "../../components/userProfile/UserProfile";

export default function Profile() {
    return (
        <div>
            <Navbar />
            <div className="profileContainer">
                <UserProfile />
                <Rightbar />
            </div>
        </div>
    )
}
