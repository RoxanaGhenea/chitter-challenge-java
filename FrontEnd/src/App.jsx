import * as React from 'react';
import Sidebar from "./Components/Sidebar.jsx";
import Feed from "./Components/Feed.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./App.css";
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import NavBar from './Components/NavBar';

function App() {
    const [user, setUser] = React.useState(null);
    return (
        <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
                <Route path='' element={<Navigate to="/home" />} />
                <Route path="/home" element={<Feed />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </>
    )
}

export default App;