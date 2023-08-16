import "../ComponentsCss/ChitterExplorePage.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";

const ChitterExplorePage = () => {
    return (
        <>
            <div className="main-page">
                <Sidebar />
                <Feed />
            </div>
        </>
    )
}

export default ChitterExplorePage;