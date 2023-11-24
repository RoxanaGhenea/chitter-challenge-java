import * as React from 'react';
// import Sidebar from "./Components/Sidebar.jsx";
import Feed from "./Components/Feed.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./App.css";
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import NavBar from './Components/NavBar';

function App() {
    const [user, setUser] = React.useState(null);
    const [allUsers, setAllUsers] = React.useState([]);
    const [allPeeps, setAllPeeps] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    React.useEffect(() => {

        const getAllUsers = async () => {
            const response = await fetch("http://127.0.0.1:3306/user/getAll", {
                method: "GET",
                headers: {  
                    "Content-Type": "application/json",
                },
            });
            const users = await response.json();
            setAllUsers(users);
        };
        getAllUsers();

        const getAllPeeps = async () => {
            const response = await fetch("http://127.0.0.1:3306/peeps/getAll", {
                method: "GET",
                headers: {  
                    "Content-Type": "application/json",
                },
            });
            const peeps = await response.json();
            setAllPeeps(peeps);
        };
        getAllPeeps();
  
        //Implementing the setInterval method
        const interval = setInterval(() => {
            setCounter(counter + 1);
        }, 10000);
  
        //Clearing the interval
        return () => clearInterval(interval);
    }, [counter]);
    
    return (
        <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
                <Route path='' element={<Navigate to="/home" />} />
                <Route path="/home" element={<Feed user={user} allUsers={allUsers} allPeeps={allPeeps} />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </>
    )
}

export default App;