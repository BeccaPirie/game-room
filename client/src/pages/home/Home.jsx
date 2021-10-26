import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Games from "../../components/games/Games";

export default function Home() {
    return (
        <>
            <Navbar/>
            <div className="homeContainer">
                <Games/>
                <Rightbar/>
            </div>
            
        </>
    )
}
