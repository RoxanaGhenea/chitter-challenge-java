import React from 'react';
import Sidebar from "./Components/Sidebar.jsx";
import Feed from "./Components/Feed.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./App.css";

function App() {
    return (
        <>
            <div className="d-flex peep-page">
                <Sidebar />
                <Feed />
            </div>
        </>
    )
}

export default App;