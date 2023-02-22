import logo from "./logo.svg";
import './App.css';
import LoginRegister from "./components/Authentication/LoginRegister";
import SubGREDDIT from "./components/SubGREDDIT/SubGREDDIT";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GredsPage from "./components/GredsPage/GredsPage";
import AllGredsPage from "./components/AllGredsPage/AllGredsPage";
import Joining from "./components/SubGREDDIT/Joining";
import UsersList from "./components/SubGREDDIT/UsersList";
import SubGREDDITPublic from "./components/AllGredsPage/SubGREDDITPublic";
import Reported from "./components/SubGREDDIT/Reported";

import { useState } from "react";
function App() {
    const [userDetails, setUserDetails] = useState(false);
    const [myGredDetails, setMyGredDetails] = useState(false);
    const [currGredDetails, setCurrGredDetails] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginRegister userDetails={userDetails} setUserDetails={setUserDetails} setMyGredDetails={setMyGredDetails} setCurrGredDetails={setCurrGredDetails} />}></Route>
                <Route path="/profile" element={<Dashboard userDetails={userDetails} setUserDetails={setUserDetails} />}></Route>
                <Route path="/mygreds" element={<GredsPage userDetails={userDetails} setUserDetails={setUserDetails} myGredDetails={myGredDetails} setMyGredDetails={setMyGredDetails} setCurrGredDetails={setCurrGredDetails} />}></Route>
                <Route path="/mygreds/gred" element={<SubGREDDIT currGredDetails={currGredDetails} setCurrGredDetails={setCurrGredDetails} />}></Route>
                <Route path="/mygreds/gred/joinReq" element={<Joining currGredDetails={currGredDetails} setCurrGredDetails={setCurrGredDetails} />}></Route>
                <Route path="/mygreds/gred/reports" element={<Reported currGredDetails={currGredDetails} setCurrGredDetails={setCurrGredDetails} />}></Route>
                <Route path="/mygreds/gred/users" element={<UsersList currGredDetails={currGredDetails} setCurrGredDetails={setCurrGredDetails} />}></Route>
                <Route path="/allgreds" element={<AllGredsPage userDetails={userDetails} setUserDetails={setUserDetails} myGredDetails={myGredDetails} setMyGredDetails={setMyGredDetails} setCurrGredDetails={setCurrGredDetails} />}></Route>
                <Route path="/allgreds/gred" element={<SubGREDDITPublic currGredDetails={currGredDetails} setCurrGredDetails={setCurrGredDetails} setUserDetails={setUserDetails} />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
