import "../ComponentsCss/ChitterExplorePage.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import LeftBar from "./LeftBar";

const ChitterExplorePage = () => {
    return (
        <>
            <div className="main-page">
                <div>
                    <Sidebar />
                </div>
                <div>
                    <Feed />
                </div>
                <div>
                    <LeftBar />
                </div> 
            </div>
        </>
    )
}

export default ChitterExplorePage;